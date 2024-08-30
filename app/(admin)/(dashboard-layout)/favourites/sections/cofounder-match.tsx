import Consultant from '@/icons/consultant';
import Eye from '@/icons/eye';
import Favourite from '@/icons/favourite';
import Image from 'next/image';
import React from 'react';

const CofounderMatch = () => {
  return (
    <div className="grid grid-cols-12 gap-5 py-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="col-span-6">
          <div className="border-grey-600 border rounded-md p-4">
            <h5 className="text-h5 2xl:text-scaled-h5 font-semibold text-olblue-900 mb-5">
              Tech (CTO)
            </h5>
            <div>
              <p className="text-black-500 text-h9 2xl:text-scaled-h9 font-semibold mb-2">
                Role Description
              </p>
              <p className="mb-4">
                TechWave Innovations is a dynamic technology company dedicated
                to creating cutting-edge solutions that redefine industry
                standards.
              </p>
              <ul className="ps-4 list-disc text-blue-400 font-medium text-h9 2xl:text-scaled-h9 mb-5">
                <li>
                  We believe in the power of collaboration. Our team works
                  closely with clients to understand their unique challenges and
                  develop customized tech solutions that drive success.
                </li>
                <li>
                  Stay ahead in the ever-evolving tech landscape with our team
                  of experts who are passionate about exploring and mastering
                  the latest technological trends.
                </li>
              </ul>
              <p className="text-black-500 text-h9 2xl:text-scaled-h9 font-semibold mb-2">
                Preferred Experience
              </p>
              <p className="text-blue-400 font-medium text-h9 2xl:text-scaled-h9 mb-5">
                TechWave Innovations is a dynamic technology company dedicated
                to creating cutting-edge solutions that redefine industry
                standards.
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-1/2">
                <div className="bg-profile-frame p-0.5 w-11 h-11 rounded-full flex items-center justify-center relative">
                  <Image
                    src={
                      'https://s3-alpha-sig.figma.com/img/d0cd/3adb/501c64c1b4cf766de6abb9fe8925fb5f?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mOviZVn7m1jIJBuoIHL0lfnGOLjWk1v25WirMfDSbMS6yzVVw55MjsftxrIt5QV5HssskRi0H2QZlng3GJSXamxa8Ge9rkGdVro5u~wOU2b55huiebIlTLB~5e9k3nKcotFmQ598SAChJndiCeHAExueRZUDItXwVwLDGNyUPtgRjWnSMXSrSSthzJysJI-AsKjL0pKe4UC68Wg4KyH~fhAPyWJvvVHTIVbI8w5hL7625I3QuOEe9m1Zyb3p1GmC-ut1QH-V5626ZnAzLFy-q6umgLZpJ0qubKm2421ZNsMKwkill~YPUbRmVnYpAa~Holv3Ev74CKFa8ldFTTaqHQ__'
                    }
                    alt="image"
                    width={44}
                    height={44}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-h8 2xl:text-scaled-h8 text-black-500 font-bold">
                    Miles Freeman
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Consultant className="w-4 h-4 text-omblue-500" />
                    <p className="text-blue-300 text-h10 2xl:text-scaled-h10 font-medium">
                      Consultant
                    </p>
                  </div>
                </div>
              </div>

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
  );
};

export default CofounderMatch;
