import { apiEndpoint, cn } from '@/utils/utils';
import React, { useCallback } from 'react';
import EditIcon from '@/icons/edit-icon';
import Trash from '@/icons/trash';
import GPS from '@/icons/gps';
import Handyman from '@/icons/handyman';
import CalenderClock from '@/icons/calender-clock';
import AccountTree from '@/icons/account-tree';
import Chip from '../ui/chip';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { getBusinessOpportunityFacilitateList, getBusinessOpportunitySeekingList } from '@/server-actions/businessDevelopment';


interface IProps {
  id: number;
  onClick: () => void;
  borderless?: boolean;
  opportunity?: any;
  setSelectedOpportunity?: any
  selectedOpportunity?: any;
  setSelectedOpportunityUserId?: any;
  SetBusinessOpportunityList?: any
  selected?: any
}

const OpportunityCard: React.FC<IProps> = ({
  id,
  borderless = false,
  onClick,
  opportunity,
  setSelectedOpportunity,
  setSelectedOpportunityUserId,
  selectedOpportunity,
  SetBusinessOpportunityList,
  selected
}) => {
  const router = useRouter()
  const handleEdit = async (id) => {
    console.log('hi');
    router.push(`business-development/update/${id}`)
  };

  const fetchBusinessOppotunityLists = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"))
      const data = {
        UserId: userData?.Id,
      };
      if (selected === 'Seeking') {
        const response = await getBusinessOpportunitySeekingList(data);
        console.log(response.data.BDSeekingList, 'response.data seeking');
        SetBusinessOpportunityList(response.data.BDSeekingList);
        setSelectedOpportunity(response.data.BDSeekingList[0]?.BDId)
        setSelectedOpportunityUserId(response.data.BDSeekingList[0]?.UserId)
      } else if (selected === 'Facilitate') {
        const response = await getBusinessOpportunityFacilitateList(data);
        console.log(response.data.BDFacilitateList, 'response.data facilitate');
        SetBusinessOpportunityList(response.data.BDFacilitateList);
        setSelectedOpportunity(response.data.BDFacilitateList[0]?.BDId)
        setSelectedOpportunityUserId(response.data.BDFacilitateList[0]?.UserId)
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || 'Error while fetching data')
      console.error('Error fetching regions:', error);
    }
  }

  const handleDelete = async (id) => {
    console.log('hi two');
    try {
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
        const res = await axios.post(`${apiEndpoint}/BusinessOpportunity/DeleteFacilateData`, {
          BDId: id
        },
          {
            headers: {
              XApiKey: 'lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5',
            },
          });

        if (res.status === 200) {
          toast.success(res.data?.Message || 'Deleted successfully');
          fetchBusinessOppotunityLists();
          console.log("called");

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
      // Handle 404 or other errors
      if (error?.response?.status === 404) {
        toast.error('Item not found (404)');
      } else {
        toast.error(error?.response?.data?.Message || 'Something went wrong');
      }
      swal("Failed!", "Failed to delete the item due to an error.", "error");
    }
  };


  return (
    <div
      className={cn(
        'rounded-md p-4',
        selectedOpportunity === opportunity?.BDId ? 'border-olblue-900 border-2' : 'border-grey-600 border',
        { 'border-none': borderless }
      )}
      onClick={() => {
        console.log("opportunity ", opportunity);

        setSelectedOpportunityUserId(opportunity?.UserId)
        setSelectedOpportunity(opportunity?.BDId)
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="space-y-2">
          <h5
            className="text-h5 2xl:text-scaled-h5 text-olblue-900 font-semibold"
            onClick={onClick}
          >
            {opportunity?.StrategyName ? opportunity?.StrategyName : "MarketDevelopment"}
          </h5>
          <div className="flex md:flex-row flex-col items-start md:items-center gap-1.5">
            {opportunity?.TacticsName !== "" && opportunity?.TacticsName.split(',')?.map(
              (item: any, index: any) => (
                <Chip key={index} text={item} />
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="w-8 h-8 rounded-full flex items-center justify-center border border-omblue-100 text-omblue-600">
            <EditIcon className="w-4 h-4" onClick={() => handleEdit(opportunity?.BDId)} />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center border border-danger-100 text-danger-600">
            <Trash className="w-4 h-4" onClick={() => handleDelete(opportunity?.BDId)} />
          </button>
        </div>
      </div>
      {opportunity?.RegionName && <div className="flex items-center gap-2 mb-5">
        <GPS className="text-omblue-600 w-6 h-6" />{' '}
        <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
          {opportunity?.RegionName}
        </p>
      </div>}
      {opportunity?.OpportunityStructure && <div className="flex items-start gap-2 mb-5">
        <Handyman className="text-omblue-600 w-6 h-6" />{' '}
        <div className="space-y-2">
          <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
            {opportunity?.OpportunityStructure}
          </p>
          {/* <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
            Vegetable and Melon Farming
          </p>
          <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
            Fruit and Tree Nut Farming
          </p> */}
        </div>
      </div>}
      {opportunity?.timeLine && <div className="flex items-center gap-2 mb-5">
        <CalenderClock className="text-omblue-600 w-6 h-6" />{' '}
        <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
          {opportunity?.timeLine}
        </p>
      </div>}
      {opportunity?.IndustryType && <div className="flex items-center gap-2 mb-5">
        <AccountTree className="text-omblue-600 w-6 h-6" />{' '}
        <p className="text-h9 2xl:text-scaled-h9 text-blue-500 font-medium">
          {' '}
          {opportunity?.IndustryType}
        </p>
      </div>}
    </div>
  );
};

export default OpportunityCard;
