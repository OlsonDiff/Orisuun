'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiEndpoint } from '@/utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/data/store';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { generateUploadFileSasTokenData } from '@/server-actions/verification';

// const Result = dynamic(() => import("@/app/quiz/Result"), { ssr: false });


const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-20">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
function formatFileName(fileName, startChars = 15, endChars = 2) {
  const ext = fileName.slice(fileName.lastIndexOf('.'));
  const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'));

  if (nameWithoutExt.length <= startChars + endChars) {
    return fileName; // No need to shorten
  }

  const start = nameWithoutExt.slice(0, startChars);
  const end = nameWithoutExt.slice(-endChars);

  return `${start}...${end}${ext}`;
}
const Chats = () => {
  let senderId;
  if (typeof window !== 'undefined') {
    senderId = JSON.parse(localStorage.getItem('userData'));
  }
  const { profileData } = useSelector((state: RootState) => state.user);
  console.log(profileData, 'profileData');
  const [sasToken, setSasToken] = useState('');
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaderChat, setLoaderChat] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  // console.log(selectedChat, 'selectedChat');

  // Fetch chat list on component mount
  const fetchChats = async () => {
    try {
      const response = await axios.post(
        `${apiEndpoint}/chat/GetActiveUserChatList`,
        {
          Name: 'string',
          Sender_UserId: senderId.Id,
          Recevier_UserId: 'string',
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );
      setLoaderChat(false);
      setChats(response.data.Result);
    } catch (error) {
      setChats([]);
      setLoaderChat(false);
      console.error('Error fetching chats:', error);
    }
  };
  useEffect(() => {
    setLoaderChat(true);
    fetchChats();
  }, [profileData]);
  useEffect(() => {
    if (selectedChat) {
      const intervalId = setInterval(() => {
        fetchMessages();
      }, 5000);

      // Clean up interval on component unmount or when selectedChatId changes
      return () => clearInterval(intervalId);
    }
  }, [selectedChat]);
  // Fetch messages when a chat is selected
  const fetchMessages = async () => {
    try {
      const response = await axios.post(
        `${apiEndpoint}/chat/GetUserChatData`,
        {
          Name: 'string',
          Sender_UserId: senderId.Id,
          Recevier_UserId: selectedChat.Recevier_UserId || selectedChat.UserId,
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );
      setMessages(response.data.Result);
      setLoader(false);
    } catch (error) {
      setMessages([]);
      setLoader(false);
      console.error('Error fetching messages:', error);
    }
  };
  useEffect(() => {
    setLoader(true);
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchChats();
    }, 5000);

    // Clean up interval on component unmount or when selectedChatId changes
    return () => clearInterval(intervalId);
  }, []);

  // Handle chat selection
  const handleChatSelect = async (chat) => {
    console.log(chat, 'chat11');

    setSelectedChat(chat);

    try {
      await axios.post(
        `${apiEndpoint}/chat/MarkAsReadMessage`,
        {
          Sender_UserId: senderId.Id,
          Recevier_UserId: chat.Recevier_UserId || chat.UserId,
        },
        {
          headers: {
            XApiKey:
              'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );

      setChats((prevChats) =>
        prevChats.map((c) => (c.id === chat.id ? { ...c, UnReadCount: 0 } : c))
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Handle new message input change
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Handle attachment change
  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);

    // Reset the file input value to allow re-uploading the same file
    e.target.value = null;
  };

  const generateUploadFileSasTokenfunc = useCallback(async () => {
    try {
      // setIsLoading(true);
      const tokenResponse = await generateUploadFileSasTokenData();
      setSasToken(tokenResponse.token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    generateUploadFileSasTokenfunc();
  }, [generateUploadFileSasTokenfunc]);

  const handleFileUpload = async (files) => {
    console.log('handleFileUpload');

    if (!files[0]) return;

    const file = files[0];
    setFile(file);
    const fileExtension = file.name.split('.').pop();
    const randomName = `${uuidv4()}.${fileExtension}`;
    const blobUrl = `https://orisuundocumentsdev.blob.core.windows.net/chat-documents/${file.name}?${sasToken}`;
    const config = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
      },
    };

    try {
      setLoaderImage(true);
      const res = await axios.put(blobUrl, file, config);
      if (res.status === 201) {
        const url = res?.config?.url;
        console.log('File uploaded successfully', url);
        const fileName = url.split('/').pop().split('?')[0];
        setAttachmentUrl(url); // Use this URL to send the message
        setAttachment(file);
        setAttachmentName(file.name); // Set the file name
        // setNewMessage(fileName); // Set the file name in the input
        setLoaderImage(false);
      }
    } catch (error) {
      setLoaderImage(false);
      setAttachment(null);
      setAttachmentUrl('');
      setAttachmentName('');
      setFile(null);
      console.error('Error uploading file to Azure Blob Storage:', error);
      toast.error('Error uploading file to Azure Blob Storage');
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() || attachment) {
      const messageData = {
        Sender_UserId: senderId.Id,
        Recevier_UserId: selectedChat.Recevier_UserId || selectedChat.UserId,
        IsRead: senderId.Id == selectedChat.Recevier_UserId ? true : false,
        Message: newMessage,
        ChatDocument: attachmentUrl
          ? {
            Document: attachmentName,
          }
          : {}, // Use the URL from file upload
      };

      try {
        const response = await axios.post(
          `${apiEndpoint}/chat/SaveMessage`,
          messageData,
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        setMessages([...messages, response.data.Result]);
        setNewMessage(''); // Clear the input field after sending
        setAttachment(null); // Clear the attachment field after sending
        setAttachmentUrl(''); // Clear the attachment URL after sending
        setAttachmentName(''); // Clear the file name after sending
        setFile(null);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  // Handle attachment removal
  const handleRemoveAttachment = () => {
    setAttachment(null);
    setAttachmentUrl('');
    setAttachmentName('');
    setFile(null);
  };
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const response = await axios.post(
          `${apiEndpoint}/chat/SearchUserByNameList`,
          { Name: query },
          {
            headers: {
              XApiKey:
                'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );
        setUserList(response.data.Result);
      } catch (error) {
        setUserList([])
        console.error('Error searching users:', error);
      }
    } else {
      setUserList([]);
    }
  };

  return (
    <div className="w-full flex flex-row h-[100vh] bg-white shadow-lg overflow-hidden flex gap-4 p-5 relative">
      {loaderChat ? (
        <Loader />
      ) : (
        <>
          <div className="w-[320px] shadow-[0_0_15px_3px_rgb(0,0,0,0.1)] overflow-hidden h-[calc(100vh-40px)]">
            <div className="p-3 relative">
              <svg
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 461.516 461.516"
                className="w-4 h-4 absolute top-1/2 left-[25px] z-50 -translate-y-1/2 pointer-events-none"
              >
                <g>
                  <path
                    d="M185.746 371.332a185.294 185.294 0 0 0 113.866-39.11L422.39 455c9.172 8.858 23.787 8.604 32.645-.568 8.641-8.947 8.641-23.131 0-32.077L332.257 299.577c62.899-80.968 48.252-197.595-32.716-260.494S101.947-9.169 39.048 71.799-9.204 269.394 71.764 332.293a185.64 185.64 0 0 0 113.982 39.039zM87.095 87.059c54.484-54.485 142.82-54.486 197.305-.002s54.486 142.82.002 197.305-142.82 54.486-197.305.002l-.002-.002c-54.484-54.087-54.805-142.101-.718-196.585l.718-.718z"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <input
                type="text"
                placeholder="Search chats"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border rounded-lg border-black-800 bg-white outline-none text-gray-700 placeholder-gray-500"
              />
            </div>

            {!!searchQuery.trim() && (
              <div className={`overflow-y-auto h-[calc(60%-33px)]`}>
                <h2 className="pt-4 px-3 text-[#2357C6] font-semibold mb-4 bg-white sticky top-0 z-50 flex items-start gap-2">
                  <svg
                    version="1.1"
                    width="512"
                    height="512"
                    x="0"
                    y="0"
                    viewBox="0 0 24 24"
                    className="hovered-paths h-6 w-6"
                  >
                    <g>
                      <g fill="#000">
                        <path
                          d="M7.25 8A.75.75 0 0 1 8 7.25h4a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8zM7.25 12a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75z"
                          fill="#2357C6"
                          opacity="1"
                          data-original="#2357C6"
                          className="hovered-path"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          d="M9.966 1.25h4.068c1.371 0 2.447 0 3.311.07.88.073 1.607.221 2.265.557a5.75 5.75 0 0 1 2.513 2.513c.336.658.484 1.385.556 2.265.071.864.071 1.94.071 3.311v1.365c0 1.549 0 2.493-.232 3.287a5.75 5.75 0 0 1-3.9 3.9c-.794.232-1.738.232-3.287.232h-.756a4.25 4.25 0 0 0-2.42.776l-.05.035-2.61 1.865C7.99 22.5 6.012 20.948 6.7 19.232a.351.351 0 0 0-.327-.482h-.601a4.522 4.522 0 0 1-4.522-4.522V9.966c0-1.371 0-2.447.07-3.311.073-.88.221-1.607.557-2.265A5.75 5.75 0 0 1 4.39 1.877c.658-.336 1.385-.484 2.265-.556.864-.071 1.94-.071 3.311-.071zM6.777 2.816c-.787.064-1.295.188-1.706.397a4.25 4.25 0 0 0-1.858 1.858c-.21.411-.333.919-.397 1.706-.065.796-.066 1.81-.066 3.223v4.228a3.022 3.022 0 0 0 3.022 3.022h.601a1.851 1.851 0 0 1 1.72 2.539c-.131.326.244.62.53.416L11.29 18.3a5.75 5.75 0 0 1 3.276-1.05H15.184c1.742 0 2.452-.008 3.012-.172a4.25 4.25 0 0 0 2.882-2.882c.164-.56.172-1.27.172-3.012V10c0-1.413 0-2.427-.066-3.223-.064-.787-.188-1.295-.397-1.706a4.25 4.25 0 0 0-1.857-1.858c-.412-.21-.92-.333-1.707-.397-.796-.065-1.81-.066-3.223-.066h-4c-1.413 0-2.427 0-3.223.066z"
                          clip-rule="evenodd"
                          fill="#2357C6"
                          opacity="1"
                          data-original="#2357C6"
                          className="hovered-path"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  Users Directory
                </h2>
                <ul>
                  {userList.length > 0
                    ? userList?.map((user) => (
                      <li
                        key={user.Id}
                        className={`flex items-center space-x-3 p-3 cursor-pointer relative `}
                        onClick={() => handleChatSelect(user)}
                      >
                        <div
                          className={`h-10 w-2 rounded-r-lg absolute left-0`}
                        ></div>
                        <img
                          src={
                            user.ProfilePicture ||
                            'https://via.placeholder.com/40'
                          }
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium ">
                            {user.FirstName + user.LastName}
                          </h3>
                        </div>
                      </li>
                    ))
                    : <p className='text-center text-lg text-gray-600 whitespace-nowrap'>No chat found</p>}
                </ul>
              </div>
            )}
            <div
              className={`overflow-y-auto ${searchQuery.trim() ? 'h-[calc(40%-33px)]' : 'h-full'
                }`}
            >
              <h2 className="pt-4 px-3 text-[#2357C6] font-semibold mb-4 bg-white sticky top-0 z-50 flex items-start gap-2">
                <svg
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  className="hovered-paths h-6 w-6"
                >
                  <g>
                    <g fill="#000">
                      <path
                        d="M7.25 8A.75.75 0 0 1 8 7.25h4a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8zM7.25 12a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75z"
                        fill="#2357C6"
                        opacity="1"
                        data-original="#2357C6"
                        className="hovered-path"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M9.966 1.25h4.068c1.371 0 2.447 0 3.311.07.88.073 1.607.221 2.265.557a5.75 5.75 0 0 1 2.513 2.513c.336.658.484 1.385.556 2.265.071.864.071 1.94.071 3.311v1.365c0 1.549 0 2.493-.232 3.287a5.75 5.75 0 0 1-3.9 3.9c-.794.232-1.738.232-3.287.232h-.756a4.25 4.25 0 0 0-2.42.776l-.05.035-2.61 1.865C7.99 22.5 6.012 20.948 6.7 19.232a.351.351 0 0 0-.327-.482h-.601a4.522 4.522 0 0 1-4.522-4.522V9.966c0-1.371 0-2.447.07-3.311.073-.88.221-1.607.557-2.265A5.75 5.75 0 0 1 4.39 1.877c.658-.336 1.385-.484 2.265-.556.864-.071 1.94-.071 3.311-.071zM6.777 2.816c-.787.064-1.295.188-1.706.397a4.25 4.25 0 0 0-1.858 1.858c-.21.411-.333.919-.397 1.706-.065.796-.066 1.81-.066 3.223v4.228a3.022 3.022 0 0 0 3.022 3.022h.601a1.851 1.851 0 0 1 1.72 2.539c-.131.326.244.62.53.416L11.29 18.3a5.75 5.75 0 0 1 3.276-1.05H15.184c1.742 0 2.452-.008 3.012-.172a4.25 4.25 0 0 0 2.882-2.882c.164-.56.172-1.27.172-3.012V10c0-1.413 0-2.427-.066-3.223-.064-.787-.188-1.295-.397-1.706a4.25 4.25 0 0 0-1.857-1.858c-.412-.21-.92-.333-1.707-.397-.796-.065-1.81-.066-3.223-.066h-4c-1.413 0-2.427 0-3.223.066z"
                        clip-rule="evenodd"
                        fill="#2357C6"
                        opacity="1"
                        data-original="#2357C6"
                        className="hovered-path"
                      ></path>
                    </g>
                  </g>
                </svg>
                Recent Chats
              </h2>
              <ul>
                {chats?.map((chat) => (
                  <li
                    key={chat.Id}
                    className={`flex items-center space-x-3 p-3 cursor-pointer relative ${selectedChat?.Id === chat?.Id ? 'bg-[#E9EEF9]' : ''
                      }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div
                      className={`h-10 w-2 rounded-r-lg absolute left-0 ${selectedChat?.Id === chat?.Id
                        ? 'bg-[#2357C6]'
                        : 'opacity-0'
                        }`}
                    ></div>
                    <img
                      src={
                        chat.ReciverProfileImage ||
                        'https://via.placeholder.com/40'
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{chat.FullName}</h3>
                      <p className="text-xs text-gray-500 w-[160px] text-ellipsis overflow-hidden whitespace-nowrap">{chat.Message}</p>
                    </div>
                    {chat.UnReadCount > 0 && (
                      <span className="text-xs text-white bg-red-500 rounded-full px-2 py-1">
                        {chat.UnReadCount}
                      </span>
                    )}
                    <span
                      className="text-xs text-gray-400"
                      dangerouslySetInnerHTML={{ __html: chat.TimeStatus }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative w-[calc(100%-340px)] shadow-[0_0_15px_3px_rgb(0,0,0,0.1)] p-3 flex flex-col">
            {selectedChat ? (
              loader ? (
                <Loader />
              ) : (
                <>
                  <div className="border-b pb-3 mb-3 flex items-center">
                    <img
                      src={
                        selectedChat.ReciverProfileImage ||
                        selectedChat.ProfilePicture ||
                        'https://via.placeholder.com/40'
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <h3 className="text-lg font-semibold">
                      {selectedChat.FullName ||
                        selectedChat.FirstName + selectedChat.LastName}
                    </h3>
                  </div>
                  <div
                    className={`flex-1 p-3 overflow-y-auto ${file
                      ? 'max-h-[calc(100vh-226px)]'
                      : 'max-h-[calc(100vh-182px)]'
                      } ${file
                        ? 'min-h-[calc(100vh-226px)]'
                        : 'min-h-[calc(100vh-182px)]'
                      }`}
                  >
                    {messages?.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start mb-4 ${message.Sender_UserId === senderId.Id
                          ? 'justify-end '
                          : 'justify-start '
                          } gap-3`}
                      >
                        <div
                          className={`flex items-center justify-between gap-5 p-3 rounded-lg text-left ${message.Sender_UserId === senderId.Id
                            ? 'bg-[#E9EEF9]'
                            : 'bg-[#f2f2f2] order-2'
                            } max-w-[80%]`}
                        >
                          <div>
                            {!!message.Message && (
                              <p className="text-sm break-all">
                                {message.Message}
                              </p>
                            )}
                            {/* {message.ChatDocument && (
                      <a
                        href={message.ChatDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        View attachment
                      </a>
                    )} */}
                            {message.ChatDocument &&
                              message.ChatDocument.Document && (
                                <a
                                  href={message.ChatDocument.Document}
                                  target="_blank"
                                  download
                                  className="text-[#2357C6] underline block break-all"
                                >
                                  {message.ChatDocument.FileName}
                                </a>
                              )}
                          </div>
                          <p
                            className="text-xs text-gray-400 mt-1 whitespace-nowrap"
                            dangerouslySetInnerHTML={{
                              __html: message.TimeStatus,
                            }}
                          ></p>
                        </div>
                        <img
                          src={
                            message.Sender_UserId === senderId.Id
                              ? message.SenderProfileImage ||
                              'https://via.placeholder.com/50'
                              : message.ReciverProfileImage ||
                              'https://via.placeholder.com/50'
                          }
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex  items-center border-t pt-3 relative gap-3">
                    <div className="w-full flex flex-col gap-2 justify-start items-start h-10">
                      <input
                        type="text"
                        placeholder="Type your message"
                        className="flex-1 w-full h-10 bg-transparent text-gray-700 outline-none text-sm font-medium"
                        value={newMessage}
                        onChange={handleMessageChange}
                      />
                      {file && (
                        <div className="flex items-center bg-white left-3 border p-3 rounded shadow-md gap-3">
                          <span className="text-sm font-medium text-ellipsis w-full overflow-hidden whitespace-nowrap box">
                            {formatFileName(file.name)}
                          </span>
                          {loaderImage ? (
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={handleRemoveAttachment}
                              className="h-4 w-4 text-red-500 flex items-center justify-center text-2xl"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex">
                      <input
                        type="file"
                        onChange={handleAttachmentChange}
                        className="hidden"
                        id="fileInput"
                      />
                      <label
                        htmlFor="fileInput"
                        className="p-2 w-10 h-10 text-blue-500 cursor-pointer"
                      >
                        <svg
                          version="1.1"
                          width="512"
                          height="512"
                          x="0"
                          y="0"
                          viewBox="0 0 32 32"
                          className="w-6 h-6"
                        >
                          <g>
                            <path
                              d="M16 28a5 5 0 0 1-5-5V6.998A2.999 2.999 0 0 1 13.998 4h.004A2.998 2.998 0 0 1 17 6.998v14.004a.998.998 0 0 1-.998.998H16a1 1 0 0 1-1-1V9a1 1 0 0 0-2 0v12a3 3 0 0 0 3 3h.002A2.998 2.998 0 0 0 19 21.002V6.998A4.998 4.998 0 0 0 14.002 2h-.004A5 5 0 0 0 9 6.998V23a7 7 0 1 0 14 0V9a1 1 0 0 0-2 0v14a5 5 0 0 1-5 5z"
                              fill="#2357C6"
                              opacity="1"
                              data-original="#2357C6"
                            ></path>
                          </g>
                        </svg>
                      </label>
                    </div>
                    <button
                      className="p-2 w-10 h-10 bg-[#2357C6] text-white p-2 rounded-lg"
                      onClick={handleSendMessage}
                    >
                      <svg
                        version="1.1"
                        width="512"
                        height="512"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                      >
                        <g>
                          <path
                            d="M1.305 3.542A1.844 1.844 0 0 1 3.92 1.445l17.81 8.905a1.844 1.844 0 0 1 0 3.3L3.92 22.555a1.844 1.844 0 0 1-2.615-2.097L3.42 12 1.305 3.542zm1.455-.363 2.16 8.639c.03.12.03.244 0 .364l-2.16 8.639a.347.347 0 0 0 .489.393l17.81-8.906a.343.343 0 0 0 0-.616L3.249 2.786a.346.346 0 0 0-.489.393z"
                            fill="#fff"
                            opacity="1"
                            data-original="#fff"
                          ></path>
                          <path
                            d="M4.369 12.75a.75.75 0 0 1 0-1.5h8.5a.75.75 0 0 1 0 1.5z"
                            fill="#fff"
                            opacity="1"
                            data-original="#fff"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </>
              )
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Chats;
