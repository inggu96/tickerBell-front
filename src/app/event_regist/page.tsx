"use client";

import Event from "@/components/form/Event";
import Header from "@/components/header/Header";
import NavTab from "@/components/NavTab/NavTab";
import { FormProvider, useForm } from "react-hook-form";

const Index = () => {
  const methods = useForm();

  return (
    <div>
      <Header />
      <div className="flex flex-row items-center justify-center w-full mx-auto mt-20 max-w-1000 mb-60">
        {/* <EventForm registType="event" /> */}
        {/* <FormProvider {...methods}> */}
        <Event />
        {/* </FormProvider> */}
      </div>
    </div>
  );
};

export default Index;
