"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { billingFrequency, planType, profileTypes } from "@/data/signupData";
import { Button } from "@/components";
import { PlanType } from "./PlanType";
import { BillingFrequency } from "./BillingFrequency";
import { ProfileDetails } from "./ProfileDetails";
import { Select } from "@/components/Input";
import { profileSchema } from "@/utils/schemas";
import { usePlanProfileContext } from "@/context/PlanProfileContext";

export const Profile = ({ setPage }) => {
  const {plan, profile} = usePlanProfileContext();
  const [selectedPlan, setSelectedPlan] = useState(planType[0]);
  const [selectedBilling, setSelectedBilling] = useState(
    plan ? plan : billingFrequency[0]?.type,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(profile);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const profileTypeValue = watch("profileType");

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      const response = await axios.post(
        "https://api.orisuun.com/api/User/Register",
        {
          FirstName: data?.firstName,
          LastName: data?.lastName,
          Email: data?.email,
          Password: data?.password,
          PrivacyCheck: true,
          ProFileType: profileTypeValue,
          BillingFrequency: selectedBilling,
        },
        {
          headers: {
            XApiKey:
              "lLBHnYLgfgYJe3dWFPSh1GygffGUcOA9JQrRbWdL5UiHg75QGcDjofnJcKyH5",
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data, "success");
      setPage(1);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      console.log("attempted submit");
    }
  };
  

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-4"
      >
        <div className="space-y-2">
          <p className="text-sm text-[#6E6E6E] font-medium">Profile Type</p>
          <Select
            options={profileTypes}
            name="profileType"
            variant="outlined"
            {...register("profileType")}
            value={selectedOption}
            onChange={handleChange}
            initialOption={profile}
            className="w-full bg-transparent py-3 px-4 select-wrapper text-sm font-medium outline-none !border border-[#B2B3B3] rounded-[8px]"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#6E6E6E] font-medium">Plan Type</p>
          <PlanType
            selected={selectedPlan}
            setSelected={setSelectedPlan}
            planType={planType}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#6E6E6E] font-medium">
            Billing Frequency
          </p>
          <BillingFrequency
            selected={selectedBilling}
            setSelected={setSelectedBilling}
            billings={billingFrequency}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#6E6E6E] font-medium">Profile details</p>
          <ProfileDetails register={register} errors={errors} />
        </div>
        <div className="flex gap-2 items-start md:items-center">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            className="mt-2 md:mt-0"
            required
          />
          <label htmlFor="agree">
            I agree to Orisuun&apos;s{" "}
            <Link href="#" className="text-nav-blue">
              Terms
            </Link>
            ,{" "}
            <Link href="#" className="text-nav-blue">
              Refund
            </Link>
            , and{" "}
            <Link href="#" className="text-nav-blue">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        <Button className="w-full h-12" disabled={loading}>
          {loading ? "Submitting..." : "Proceed to Payment"}
        </Button>
      </form>
    </>
  );
};
