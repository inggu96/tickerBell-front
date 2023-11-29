"use client";

import { postEventApi } from "@/api/events";
import { day, weekDay } from "@/util/day";
import dayjs from "dayjs";
import { KeyboardEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { Dropzone } from "./Dropzone";
import FRInput from "./FRInput";

import FRRadio from "./FRRadio";
import { ImageUpload } from "./ImageUpload";
import { InputField } from "./InputField";
import { OnDatePicker } from "./OnDatePicker";
import { fileWithPreview } from "./util";

const Event = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
      castings: [],
      hosts: [],
    },
  });

  const [atk, setAtk] = useState("");
  const [mapOnModal, setMapOnModal] = useState(false);
  const [thumbNailUrl, setThumbNailUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: castingsFields,
    append: appendCasting,
    remove: removeCasting,
  } = useFieldArray({
    control,
    name: "castings",
  });

  const {
    fields: hostsFields,
    append: appendHost,
    remove: removeHost,
  } = useFieldArray({
    control,
    name: "hosts",
  });

  const addTag = (tagName: string): void => {
    if (tagName && tagName.length >= 2) {
      appendTag({ name: tagName });
    }
  };
  const addCasting = (castingName: string): void => {
    if (castingName && castingName.length >= 2) {
      appendCasting({ name: castingName });
    }
  };

  const addHost = (hostName: string): void => {
    if (hostName && hostName.length >= 2) {
      appendHost({ name: hostName });
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    action: (name: string) => void
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = event.currentTarget.value.trim();
      if (name) {
        action(name);
        event.currentTarget.value = "";
      }
    }
  };

  const onSubmit = async (onData: FormData): Promise<void> => {
    const tagNames = onData.tags.map((tag) => tag.name);
    const castingNames = onData.castings.map((casting) => casting.name);
    const hostNames = onData.hosts.map((host) => host.name);
    const updatedImageUrls = [thumbNailUrl, ...imageUrls];

    const payload = {
      name: onData.name,
      startEvent: day(onData.startEvent),
      endEvent: day(onData.endEvent),
      availablePurchaseTime: day(onData.availablePurchaseTime),
      tags: tagNames,
      castings: castingNames,
      hosts: hostNames,
      place: onData.place,
      category: onData.category,
      isAdult: onData.isAdult,
      normalPrice: onData.normalPrice,
      premiumPrice: onData.premiumPrice,
      saleDegree: onData.saleDegree,
      isSpecialA: onData.isSpecialA,
      isSpecialB: onData.isSpecialB,
      isSpecialC: onData.isSpecialC,
      imageUrls: updatedImageUrls,
    };
    console.log("dd", payload);

    try {
      const response = await postEventApi(atk, payload);
      console.log(response);
    } catch (error) {
      console.error("이벤트 등록 실패:", error);
    }
  };

  // 컴포넌트 반환
  return (
    <>
      <div className="flex flex-col justify-center w-full mt-12 shadow sm:py-12 gap-52">
        <div className="w-2/3 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {mapOnModal && (
              <SearchMapModal
                className="w-900 px-30 py-50"
                setOnModal={() => setMapOnModal(false)}
                company={enroll_company}
                setCompany={setEnroll_company}
              />
            )}
            <div className="flex items-center space-x-5">
              <div className="flex items-center justify-center flex-shrink-0 w-32 h-32 font-mono text-2xl text-yellow-500 bg-yellow-200 rounded-full">
                i
              </div>
              <div className="self-start block pl-2 text-xl font-semibold text-gray-700">
                <h2 className="leading-relaxed">Create an Event</h2>
                <p className="text-sm font-normal leading-relaxed text-gray-500">
                  시작날짜는 최소 2주 뒤부터 설정 가능합니다
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                이벤트명
              </label>
              <input
                className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                id="name"
                placeholder="입력해주세요"
                maxLength={20}
                {...register("name", {
                  required: "이벤트명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* 시작일 선택 */}
            <div className="flex flex-row gap-12">
              <div>
                <label
                  htmlFor="startEvent"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  시작일
                </label>
                <div>
                  <OnDatePicker
                    control={control}
                    name="startEvent"
                    minDate={weekDay(0).toDate()}
                    maxDate={weekDay(6).toDate()}
                    rules={{ required: true }}
                  />
                </div>
              </div>
              {/* 종료일 선택 */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  종료일
                </label>
                <div>
                  <OnDatePicker
                    control={control}
                    name="endEvent"
                    minDate={
                      watch("startEvent")
                        ? dayjs(watch("startEvent")).toDate()
                        : undefined
                    }
                    maxDate={
                      watch("startEvent") ? weekDay(2).toDate() : undefined
                    }
                    rules={{ required: true }}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  구매 가능 시간
                </label>
                <OnDatePicker
                  control={control}
                  name="availablePurchaseTime"
                  minDate={
                    watch("startEvent") ? weekDay(-2).toDate() : undefined
                  }
                  maxDate={new Date()}
                />
              </div>
            </div>
            {/* 이벤트 캐스팅 */}
            <div>
              <InputField
                id="tags"
                name="tags"
                label="이벤트태그"
                placeholder="이벤트 태그를 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addTag)}
                fields={tagsFields}
                remove={removeTag}
              />
              <InputField
                id="castings"
                name="castings"
                label="배우명"
                placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addCasting)}
                fields={castingsFields}
                remove={removeCasting}
              />
              <InputField
                id="hosts"
                name="hosts"
                label="주최자명"
                placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addHost)}
                fields={hostsFields}
                remove={removeHost}
              />
            </div>
            <div className="mb-10">
              <label
                htmlFor="place"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                주소
              </label>
              <div className="flex flex-row gap-12 mb-10 ">
                <div className="mb-10">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapOnModal(true);
                    }}
                  >
                    검색
                  </Button>
                </div>
                <input
                  className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                  type="text"
                  id="place"
                  maxLength={5}
                  {...register("place", { required: true })}
                  value={enroll_company.address}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-row ">
              <label>성인여부</label>
              <div className="flex flex-row gap-12">
                <label>
                  <FRRadio {...register("isAdult")} value="true" id="adult" />
                  성인
                </label>
                <label>
                  <FRRadio
                    {...register("isAdult")}
                    value="false"
                    id="non-adult"
                  />
                  미성년
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <span>카테고리</span>
              <div className="flex flex-row gap-12">
                {["MUSICAL", "CONCERT", "PLAY", "CLASSIC", "SPORTS"].map(
                  (category) => {
                    const selectedCategory = watch("category");
                    const borderClass =
                      selectedCategory === category
                        ? "border-blue-500"
                        : "border-gray-200";

                    return (
                      <label key={category}>
                        <FRRadio
                          {...register("category", { required: true })}
                          label={category}
                          id={category}
                          type="radio"
                          value={category}
                          className={borderClass}
                        />
                      </label>
                    );
                  }
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span>성인여부</span>
              <div className="flex flex-row gap-12">
                {["true", "false"].map((value) => {
                  const selectedAdult = watch("isAdult");
                  const borderClass =
                    selectedAdult === value
                      ? "border-blue-500"
                      : "border-gray-200";

                  return (
                    <FRRadio
                      key={value}
                      {...register("isAdult", { required: true })}
                      label={value}
                      id={value}
                      type="radio"
                      value={value}
                      className={borderClass}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row">
              <label className="mr-4">성인여부</label>
              <div className="flex flex-row gap-12">
                {[true, false].map((value) => {
                  const selectedAdult = watch("isAdult");
                  const borderClass =
                    selectedAdult == value
                      ? "border-blue-500"
                      : "border-gray-200";

                  return (
                    <label key={String(value)}>
                      <FRRadio
                        {...register("isAdult")}
                        type="radio"
                        value={value}
                        id={value ? "adult" : "non-adult"}
                        label={value ? "성인" : "미성년"}
                        className={borderClass}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-row gap-12">
              <FRInput
                {...register("normalPrice", { required: true })}
                className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                label="일반 가격"
                id="normalPrice"
                type="text"
              />
              <FRInput
                {...register("premiumPrice", { required: true })}
                className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                label="프리미엄 가격"
                id="premiumPrice"
              />
              <FRInput
                {...register("saleDegree", { required: true })}
                className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                label="할인 금액"
                id="saleDegree"
              />
            </div>

            <div className="flex flex-row item-center">
              <FRInput
                {...register("isSpecialA")}
                label="특별 옵션 A"
                id="isSpecialA"
                type="checkbox"
              />
              <FRInput
                {...register("isSpecialB")}
                label="특별 옵션 B"
                id="isSpecialB"
                type="checkbox"
              />
              <label className="flex items-center justify-between px-4 py-2 text-sm border-2 border-gray-200 rounded-lg cursor-pointer group hover:bg-gray-50">
                <FRInput
                  {...register("isSpecialC")}
                  label="특별 옵션 C"
                  id="isSpecialC"
                  type="checkbox"
                />
              </label>
            </div>
            <ImageUpload
              setThumbNailUrl={setThumbNailUrl}
              setImageUrls={setImageUrls}
            />
            <div>
              <Controller
                name="thumbnailUrl"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropzone
                    onDrop={(files) => {
                      onChange(files[0]);
                    }}
                    onDelete={(file) => {
                      onChange(null);
                      // console.log("onDelete", file);
                    }}
                    maxFiles={1}
                    files={value ? [fileWithPreview(value)] : []}
                  />
                )}
              />
            </div>
            <Button
              className="mt-20 bg-blue-700 hover:bg-blue-800"
              type="submit"
            >
              이벤트 생성
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Event;

// "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-blue-500"
//                               : "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200";
