'use client';
import Button from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import ProfileCard from '@/components/cards/profile-card';
import { apiEndpoint, cn } from '@/utils/utils';
import Image from 'next/image';
import message from '@/public/images/vector/message.svg';
import transfer from '@/public/images/vector/exhange.svg';
import cross from '@/public/images/vector/cross.svg';
import Hamburger from '@/icons/sidebar/hamburger';
import { Select } from '@headlessui/react';
import { useMobileMediaQuery } from '@/hooks/useMediaQuery';
import ChevronRight from '@/icons/chevron-right';
import EditIcon from '@/icons/edit-icon';
import Trash from '@/icons/trash';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setOpenSidebar } from '@/data/slices/common-slice';
import Consultant from '@/icons/consultant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const CofounderMatch = () => {
  const router = useRouter();
  const [selected, setSelected] = useState('cofounder');
  const [showDetails, setShowDetails] = useState<number | null>(null);
  const [coFounders, setCoFounders] = useState([])
  const [selectCoFounder, setSelectCoFounder] = useState()
  const [coFounderMatches, setCoFounderMatches] = useState([])
  const isMobile = useMobileMediaQuery();
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchCoFounders = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const res = await axios.get(
        `${apiEndpoint}/BusinessMember/GetBusinessMemberOpportunityDetails?Id=${selected === 'cofounder' ? 2 : 1002
        }&UserId=${userData.Id}`,
        {
          headers: {
            XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        }
      );
      if (res.status === 200) {
        setCoFounders(res.data?.Result);
        setSelectCoFounder(res.data?.Result[0]?.Id);
      }
    };

    fetchCoFounders();
  }, [selected]);

  const handleDelete = async (id) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));

      // Show confirmation dialog
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this item? This action cannot be undone.",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            className: "swal-button--cancel",
            closeModal: true,
          },
          confirm: {
            text: "Confirm",
            value: true,
            visible: true,
            className: "swal-button--confirm",
            closeModal: false, // This keeps the modal open until you manually close it
          }
        },
      });

      if (willDelete) {
        // Proceed with deletion
        const res = await axios.delete(`${apiEndpoint}/BusinessMember/DeleteBusinessMemberOpportunity?Id=${id}&UserId=${userData?.Id}`, {
          headers: {
            XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        });

        if (res.status === 200) {
          toast.success("BusinessMember deleted successfully");

          // Fetch updated data after deletion
          const resData = await axios.get(`${apiEndpoint}/BusinessMember/GetBusinessMemberOpportunityDetails?Id=${selected === 'cofounder' ? 2 : 1002}&UserId=${userData.Id}`, {
            headers: {
              XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          });

          if (resData.status === 200) {
            setCoFounders(resData.data?.Result);
            setSelectCoFounder(resData.data?.Result[0]?.Id);
          }

          swal("Deleted!", "Your item has been deleted!", "success");
        } else {
          toast.error(res.data?.Message || 'Failed to delete');
          swal("Failed!", "Failed to delete the item.", "error");
        }
      } else {
        // User canceled the delete action
        swal("Cancelled", "Your item is safe.", "info");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error?.response?.data?.Message || 'Something went wrong');
      swal("Failed!", "Failed to delete the item due to an error.", "error");
    }
  };


  useEffect(() => {
    const fetchCoFounderMatches = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (selectCoFounder) {
        const res = await axios.post(
          `${apiEndpoint}/BusinessOpportunity/GetMatchedListBasedonBdId`,
          {
            BDId: selectCoFounder,
            UserId: userData?.Id,
          },
          {
            headers: {
              XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          }
        );

        if (res.status === 200) {
          setCoFounderMatches(res.data?.Result);
        }
      }
    };

    fetchCoFounderMatches();
  }, [selectCoFounder]);

  const handleReject = async (id) => {
    try {

      const res = await axios.post(`${apiEndpoint}/BusinessOpportunity/RejectMatchedRequest`, {
        MatchedId: id
      },
        {
          headers: {
            XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
          },
        })

      if (res.status == 200) {
        toast.success("Rejected successfully")
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (selectCoFounder) {
          const res = await axios.post(
            `${apiEndpoint}/BusinessOpportunity/GetMatchedListBasedonBdId`,
            {
              BDId: selectCoFounder,
              UserId: userData?.Id,
            },
            {
              headers: {
                XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
              },
            }
          );

          if (res.status === 200) {
            setCoFounderMatches(res.data?.Result);
          }
        }
      }
    } catch (error) {
      console.log("Error ", error);
      toast.error(error?.response?.data?.Message || 'Something went wrong')
    }

  }

  if (showDetails !== null) {
    return (
      <div className="px-4">
        <div className="md:hidden flex items-center justify-between py-4">
          <ChevronRight
            onClick={() => setShowDetails(null)}
            className="rotate-180 text-black-700"
          />
        </div>
        <div className="my-6">
          <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500 mb-6">
            Board Member for Tech Company in Berlin (Two years)
          </h6>
          <div className="flex items-center justify-between gap-2 mb-5">
            <h5
              className="text-h5 2xl:text-scaled-h5 text-olblue-900 font-semibold"
              onClick={() => { }}
            >
              Tech (CTO)
            </h5>

            <div className="flex items-center gap-0.5">
              <button className="w-8 h-8 rounded-full flex items-center justify-center border border-omblue-100 text-omblue-600">
                <EditIcon className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center border border-danger-100 text-danger-600">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
            Role Description
          </p>
          <p className="text-blue-400 text-h9 2xl:text-scaled-h9 font-medium">
            TechWave Innovations is a dynamic technology company dedicated to
            creating cutting-edge solutions that redefine industry standards...
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
            Preferred Experience
          </p>
          <p className="text-blue-400 text-h9 2xl:text-scaled-h9 font-medium">
            TechWave Innovations is a dynamic technology company dedicated to
            creating cutting-edge solutions that redefine industry standards...
          </p>

          <div className="space-y-2">
            <h6 className="text-h6 2xl:text-scaled-h6 font-semibold text-blue-500 mb-6">
              Board of Directors Member Matches
            </h6>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full md:hidden flex-col items-center md:px-4 md:py-2"
              >
                <div className="w-full border border-grey-600 rounded-md px-4 py-3">
                  <div className="w-full flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <p className="text-h10 2xl:text-scaled-h10 font-semibold flex items-center text-black-500">
                        Market Penetration
                      </p>
                      <p className="text-h10 2xl:text-scaled-h10 font-medium flex items-center text-green-500">
                        Mutually Matched
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <ProfileCard
                      variant="sm"
                      name="Brooks Orozco"
                      company="Consultant"
                      image="https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__"
                    />
                    <div className="flex items-center gap-2">
                      <button className="border border-blue-100 p-2 rounded-full">
                        <Image
                          src={message}
                          alt="message"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                      <button className="border border-danger-100 p-2 rounded-full">
                        <Image
                          src={cross}
                          alt="message"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 h-screen">
      <div className="md:hidden flex items-center justify-between py-4">
        <Hamburger onClick={() => dispatch(setOpenSidebar())} />
        <p className="text-h7 2xl:text-scaled-h7 font-semibold text-blue-600">
          Business Development
        </p>
        <Image
          src={
            'https://s3-alpha-sig.figma.com/img/dac5/a3ff/5be85d0f6bc0bd1a076017beb8ff1fd5?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Fbq8-00tTn89qrFknVra54OEOZxXUv6gEBapDYp8O4rLEeirGr7tIZgBAhKx--cAblwfzvHi6jnmdWcuQHAT70Lbii-ZohFcFitXIviIUEnBQ-7f7ZbtvLqhlrW8ShZpTynL7brvs0guDJAZ7lM5VzZ1XLh7g66pmjS9KmOvjugVI~ZIhC27v3NbK5Fg-28J~ljwAdv1-TaQ4AJMXRvp1Ft0QTji5mJMphYf1gmISiou8uUwVIyU04hKvJXTu9i0n-7EtXwpCZ5Ztb0e3sw7vf9hjuCSV61BXvg2-Ojz7Mb1EGG3YqXLWoymTIDSexU0aeHfDLZiOungr2bQFTXOlQ__'
          }
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>

      <div className="py-6 h-[calc(100vh-5rem)]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="hidden md:flex items-center gap-6 text-h7 2xl:text-scaled-h7">
            <button
              onClick={() => setSelected('cofounder')}
              className={cn(
                'cursor-pointer border-b-2',
                selected === 'cofounder'
                  ? 'border-omblue-600 text-omblue-600 font-semibold'
                  : 'text-[#797B82] border-transparent font-medium'
              )}
            >
              <p className="px-4 py-3">Co-Founder</p>
            </button>
            <button
              onClick={() => setSelected('bod')}
              className={cn(
                'cursor-pointer border-b-2',
                selected === 'cofounder'
                  ? 'text-[#797B82] border-transparent font-medium'
                  : 'border-omblue-600 text-omblue-600 font-semibold'
              )}
            >
              <p className="px-4 py-3">Board of Directors Member</p>
            </button>
          </div>

          <Select
            className={
              'text-omblue-600 md:hidden flex-1 w-full focus-visible:outline-none'
            }
          >
            <option className="text-h9 2xl:text-scaled-h9 font-semibold">
              Co-Founder
            </option>
            <option className="text-h9 2xl:text-scaled-h9 font-semibold">
              Board of Directors Member
            </option>
          </Select>

          <Link href={'/cofounder-and-board-matcher/create-new'}>
            <Button title="Create New"></Button>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-12 md:col-span-4 overflow-y-auto">
            <p className="py-4 pe-3 mb-2 text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold md:block hidden">
              {selected === 'cofounder'
                ? 'Co-Founder'
                : 'Board of Directors Member'}
            </p>
            <div className="space-y-4">
              {coFounders ? coFounders?.map((data, index) => (
                <div
                  key={index}
                  className={cn(
                    'rounded-md p-4 space-y-6',
                    selectCoFounder === data?.Id
                      ? 'border-olblue-900 border-2'
                      : 'border-grey-600 border',
                    { 'border-none': isMobile }
                  )}
                  onClick={() => setSelectCoFounder(data?.Id)}
                >
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <h5
                      className="text-h5 2xl:text-scaled-h5 text-olblue-900 font-semibold"
                      onClick={() => {
                        if (isMobile) setShowDetails(1);
                      }}
                    >
                      {data?.BusinessName}
                    </h5>

                    <div className="flex items-center gap-0.5">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-omblue-100 text-omblue-600">
                        <EditIcon className="w-4 h-4" onClick={() => router.push(`/cofounder-and-board-matcher/update/${data?.Id}`)} />
                      </button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center border border-danger-100 text-danger-600">
                        <Trash className="w-4 h-4" onClick={() => handleDelete(data?.Id)} />
                      </button>
                    </div>
                  </div>

                  {selected == "cofounder" && <div className="space-y-3">
                    <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                      Role Description
                    </p>
                    <p className="text-blue-400 text-h9 2xl:text-scaled-h9 font-medium">
                      {data?.RoleDescription ? data?.RoleDescription : 'TechWave Innovations is a dynamic technology company dedicated to creating cutting-edge solutions that redefine industry standards...'}
                    </p>
                  </div>}

                  <div className="space-y-3">
                    <p className="text-h9 2xl:text-scaled-h9 font-semibold text-black-500">
                      Preferred Experience
                    </p>
                    <p className="text-blue-400 text-h9 2xl:text-scaled-h9 font-medium">
                      {data?.PreferredExperienceDescription ? data?.PreferredExperienceDescription : 'TechWave Innovations is a dynamic technology company dedicated to creating cutting-edge solutions that redefine industry standards...'}
                    </p>
                  </div>
                </div>
              )) :
                <div className='className="flex border-b border-grey-600 p-10 justify-center text-center'>
                  No Co-Founder Matches found
                </div>
              }
            </div>
          </div>

          <div className="col-span-8 md:flex hidden flex-col overflow-hidden">
            <h6 className="py-4 pe-3 mb-2 text-h6 2xl:text-scaled-h6 text-blue-500 font-semibold">
              Co-Founder Matches
            </h6>
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex bg-omblue-25 p-3 flex-shrink-0">
                <div className="w-[40%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                  Profile
                </div>
                <div className="w-[30%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                  Status
                </div>
                <div className="w-[30%] text-start text-blue-500 text-h9 2xl:text-scaled-h9 font-semibold">
                  Actions
                </div>
              </div>

              <div className="flex-grow overflow-y-auto">
                {coFounderMatches ? coFounderMatches.map((data, index) => (
                  <div
                    key={index}
                    className="flex border-b border-grey-600 p-3"
                  >
                    <div className="w-[40%]">
                      <ProfileCard
                        variant="sm"
                        name={data?.CompanyName}
                        company={data?.Tagline}
                        icon={
                          <Consultant className="text-omblue-600 w-4 h-4" />
                        }
                        isImage={false}
                        image={`${data?.ProfilePicture ? data?.ProfilePicture : 'https://s3-alpha-sig.figma.com/img/b52e/1df2/041e981fea2ab7e77f156b65e259af97?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oJ4CI60SfZDBcEOshC-sHR0VWjSscdN-N5Fyl2p6YLJVpQNpRJhdK1wlvPo5mU5wyHJtE3UL4uONPSWQkmTO6oz6Ce5UMvaYNwfWWaxnnR9bsxaIRzoadg2-imUJSzAn-6eV6wDMqKiGzKB4zNjQ0ElOCI5~bcGrC-aBLcpqApPrqFI0D3u4r2hMW5Zx86X02b3H3LPsIQFYRQjl9CTHEYnuhH6tzkC~8p8lM-~lKqteziS6Nsh-OgwUklU0dECXvj590RCu7xUPDKv5aCdYPVrnwtIZ6j78UuJxt0wRpiwPfqpI~1EgqWkNA6iwoZMTzU~ZQMmRV-SDCLYX8BXz0Q__'}`}
                      />
                    </div>
                    <div
                      className={cn(
                        'w-[30%] text-h10 2xl:text-scaled-h10 font-medium flex items-center',
                        index === 2 ? 'text-blue-500' : 'text-green-500'
                      )}
                    >
                      {data?.IsBDCreatedUserProfileMatched ? 'Mutually Matched' : 'Matched'}
                    </div>
                    <div className="w-[30%] flex items-center gap-2">
                      <button className="border border-blue-100 p-2 rounded-full">
                        <Image
                          src={index === 2 ? transfer : message}
                          alt="message"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                      <button className="border border-danger-100 p-2 rounded-full" onClick={() => handleReject(data?.MatchedId)}>
                        <Image
                          src={cross}
                          alt="message"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                )) :
                  <div className='className="flex border-b border-grey-600 p-10 justify-center text-center'>
                    No Co-Founder Matches found
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CofounderMatch;
