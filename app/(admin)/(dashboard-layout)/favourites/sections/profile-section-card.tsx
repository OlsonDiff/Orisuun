import ProfileCard from '@/components/cards/profile-card';
import CustomSelect from '@/components/ui/select';
import Consultant from '@/icons/consultant';
import Eye from '@/icons/eye';
import Favourite from '@/icons/favourite';

const ProfileSectionCard = () => {
  return (
    <div>
      <div className="w-full py-6">
        <div className="w-full flex items-center gap-4">
          <CustomSelect
            options={[]}
            onChange={function (selectedOption: any): void {
              throw new Error('Function not implemented.');
            }}
            error={undefined}
            value={undefined}
            controlClasses="w-full"
            className="w-full"
          />
          <CustomSelect
            options={[]}
            onChange={function (selectedOption: any): void {
              throw new Error('Function not implemented.');
            }}
            error={undefined}
            value={undefined}
            controlClasses="w-full"
            className="w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="col-span-6" key={index}>
            <div className="w-full h-full p-4 rounded-md border border-grey-600">
              <div className="w-full flex items-center justify-between">
                <ProfileCard
                  image="https://s3-alpha-sig.figma.com/img/973e/b8a3/1cb546618038fc7386e22a401859244c?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LIE2xFxJOhef5r54-xeFpIrWsk5XRSntXEI~iR273R6xYdAa-YqbFoiVIzVAYV6KSxZco3gbRUq4ExftSdAtOOFWIhl9BJuVcIINIRHdavEC0qG8XItr~~59ZkMJXRfRNROzgRoPIf0c5VIT9SLvAmCLDBchESj2a5~KX4LOXlG3wiGbihHsuqIER0VDZmsKo1wRcoj-3A~65u6LhFIwAmTJOPZbgmQQ4pK-KZpL0y4gWFQnYVXZ7tuLrW733iXM6MMW~fh0a~Bup7jIRzE3inZKX6egtnB2XxeTDpCYakJg64Ox3049D3qisNpCthwG3W-r7scRSk2vRmJdYQWibg__"
                  name="Brooklyn Simmons"
                  company={'Southern California Management Consultants'}
                  isImage={false}
                  icon={<Consultant className="w-4 h-4 text-omblue-600" />}
                  variant="xl"
                />
                <div className="w-1/2 flex items-center justify-end gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-green-500 bg-green-50 rounded-full p-2">
                    <Favourite className="w-5 h-5 text-green-500 " />
                  </div>
                  <button className="flex items-center gap-2 border border-omblue-100 px-5 py-3.5 rounded-md">
                    <Eye className="w-4 h-4 text-omblue-500" />
                    <p className="text-h9 2xl:text-scaled-h9 text-omblue-500 font-medium">
                      View Profile
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSectionCard;
