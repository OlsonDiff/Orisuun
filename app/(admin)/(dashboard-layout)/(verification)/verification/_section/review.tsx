import Button from '@/components/ui/button';
import UploadedFile from '@/components/ui/uploaded-file';
import EditIcon from '@/icons/edit-icon';
import React, { Dispatch, SetStateAction } from 'react';

interface IProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const Review: React.FC<IProps> = ({ step, setStep }) => {
  const sample = './sample.pdf';
  return (
    <div className="flex flex-col items-start justify-center max-w-[465px] mx-auto md:my-16 px-4 py-5 gap-10">
      <div className="block w-full">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h5 className="font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
            Online Presence
          </h5>
          <EditIcon />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://website.com
          </p>
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://facebook.com/pagename
          </p>
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://twitter.com/pagename
          </p>
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://linkedin.com/pagename
          </p>
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://instagram.com/pagename
          </p>
          <p className="font-medium text-h6 2xl:text-scaled-h6">
            https://instagram.com/pagename
          </p>
        </div>
      </div>
      <div className="block w-full">
        <div className="flex items-center justify-between w-full gap-4 mb-6">
          <h5 className="font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
            Personal Identification (for Each Owner)
          </h5>
          <EditIcon />
        </div>
        <div>
          {/* <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">Id(s) photos</p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">Résumé/CV</p>
            <UploadedFile file={sample} readOnly={true} />
          </div> */}
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              LinkedIn
            </p>
            <p className="text-black-500">https://linkedin.com/pagename</p>
          </div>
        </div>
      </div>
      <div className="block w-full">
        <div className="flex items-center justify-between w-full gap-4 mb-6">
          <h5 className="font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
            Business formation documents (eg, articles of incorporation)
          </h5>
          <EditIcon />
        </div>
        {/* <div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Certificate of good standing
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Any shareholder agreements
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Company Bylaws
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Current stock/share transfer ledger
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Latest federal tax return ownership schedule (eg, 1065 K-1, 1120
              G, 1065 C, 1040 C)
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Proof of Any Recognition
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Proof of Any Certifications
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
          <div className="mb-4">
            <p className="mb-3 font-semibold text-blue-500 text-h9 2xl:text-scaled-h9">
              Proof of Any Affiliations
            </p>
            <UploadedFile file={sample} readOnly={true} />
          </div>
        </div> */}
      </div>
      <div className="block w-full">
        <div className="flex items-center justify-between w-full gap-4 mb-6">
          <h5 className="font-semibold text-blue-500 text-h5 2xl:text-scaled-h5">
            Statement
          </h5>
          <EditIcon />
        </div>
        <div className="mb-4">
          <p className="text-blue-400 text-h7 2xl:text-scaled-h7">
            TechWave Innovations is a dynamic technology company dedicated to
            creating cutting-edge solutions that redefine industry standards.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse w-full mt-auto md:mx-4 md:ml-auto md:flex-row">
        <Button
          className={
            'text-h9 2xl:text-scaled-h9 text-omblue-500 bg-transparent font-semibold w-full px-4 py-3 me-2 mb-2'
          }
          title="Back"
          onClick={() => setStep(step - 1)}
        />
        <Button
          className="min-w-full w-full mb-2 btn-secondary text-h9 2xl:text-scaled-h9 ms-1 md:min-w-[170px]"
          title="Submit"
          onClick={() => setStep(step + 1)}
        />
      </div>
    </div>
  );
};

export default Review;
