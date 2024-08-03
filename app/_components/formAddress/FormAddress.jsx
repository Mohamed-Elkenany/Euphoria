"use client";
import SubmitButton from "@/app/my_account/(userInfo)/delivery_address/SubmitButton";
import Link from "next/link";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import ReactCountryFlag from "react-country-flag";
import "react-country-state-city/dist/react-country-state-city.css";
import "@/app/my_account/(userInfo)/delivery_address/module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cityFun,
  countryFun,
  stateFun,
} from "@/app/_utitly/slices/countryStateCitySlice";
import { redirect } from "next/navigation";
function FormAddress({ actionForm, formState }) {
  const dispatch = useDispatch();
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const phoneRef = useRef(null);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const countryStateCity = useSelector(
    (state) => state.rootReducer.countryStateCitySlice
  );
  const [, startTransition] = useTransition();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateFocus, setStateFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  const selectCountry = (e, select) => {
    e.preventDefault();
    dispatch(countryFun(select));
    return setCountryList([]);
  };
  const selectState = async (e, select) => {
    e.preventDefault();
    stateRef.current.value = select.name;
    dispatch(stateFun(select));
    await GetCity(countryStateCity.country.id, select.id).then((result) => {
      dispatch(cityFun({ lists: result }));
      setCityList(result);
      setStateList([]);
    });
  };
  const selectCity = (e, select) => {
    e.preventDefault();
    cityRef.current.value = select.name;
    dispatch(cityFun(select));
    setCityList([]);
  };
  const handleCountryFilter = (e) => {
    e.preventDefault();
    const filterCountry = countryStateCity.country.lists.filter((country) => {
      if (e.target.value === "") {
        return setCountryList([]);
      }
      return (
        country.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    setCountryList(filterCountry);
  };
  const handleStateFilter = (e) => {
    e.preventDefault();
    const filterState = countryStateCity.state.lists.filter((state) => {
      if (e.target.value === "") {
        return setStateList([]);
      }
      return (
        state.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    setStateList(filterState);
  };
  const handleCityFilter = (e) => {
    e.preventDefault();
    const filterCity = countryStateCity.city.lists.filter((city) => {
      if (e.target.value === "") {
        return setCityList([]);
      }
      return (
        city.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    setCityList(filterCity);
  };
  useEffect(() => {
    async function getCountry() {
      const country = await GetCountries();
      if (country) {
        dispatch(countryFun({ lists: country }));
      }
    }
    getCountry();
  }, [dispatch]);
  useEffect(() => {
    if (formState.data) {
      const timeout = setTimeout(
        () => startTransition(() => redirect("/my_account")),
        2000
      );

      return () => clearTimeout(timeout);
    }
  }, [formState]);
  useEffect(() => {
    countryRef.current.value = countryStateCity.country.name;
  }, [countryStateCity.country.name]);
  return (
    <div>
      <form action={actionForm}>
        <div className="top grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="relative">
            <input
              ref={fNameRef}
              type="text"
              name="Fname"
              placeholder="First Name"
              id="Fname"
              className={`${
                formState?.zodErrors?.Fname && "focus:outline-red-500"
              }`}
            />
            <label htmlFor="Fname">First Name</label>
            {formState?.zodErrors?.Fname && (
              <span className="mt-1 text-red-500 text-xs font-medium">
                {formState.zodErrors.Fname[0]}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              ref={lNameRef}
              type="text"
              name="Lname"
              placeholder="Last Name"
              id="Lname"
            />
            <label htmlFor="Lname">Last Name</label>
            <span className="mt-1 text-red-500 text-xs font-medium">
              {formState?.zodErrors?.Lname && (
                <span className="mt-1 text-red-500 text-xs font-medium">
                  {formState.zodErrors.Lname[0]}
                </span>
              )}
            </span>
          </div>
          <div className="relative">
            <input
              ref={countryRef}
              placeholder="Country / Region"
              type="text"
              name="country"
              id="Country / Region"
              onChange={(e) => handleCountryFilter(e)}
            />
            <label htmlFor="Country">Country / Region</label>
            {formState?.zodErrors?.country && (
              <span className="mt-1 text-red-500 text-xs font-medium">
                {formState.zodErrors.country[0]}
              </span>
            )}
            <div className="absolute z-30 max-h-[200px] w-full left-0 top-[50px] bg-colorGrayFive rounded-md flex flex-col justify-start overflow-y-auto shadow-md">
              {countryList.map((country, i) => {
                return (
                  <button
                    onClick={async (e) => {
                      selectCountry(e, {
                        name: country.name,
                        id: country.id,
                        phoneCode: country.phone_code,
                      });
                      phoneRef.current.defaultValue = `+${country.phone_code}`;
                      const response = await GetState(country.id);
                      dispatch(stateFun({ lists: response }));
                      setStateList(response);
                    }}
                    key={i}
                    className="py-1 px-2 hover:bg-colorGrayThree"
                  >
                    <div className="flex items-center gap-x-1">
                      <ReactCountryFlag svg countryCode={country.iso2} />
                      <h1 className="text-sm">{country.name}</h1>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <input
              placeholder="Company Name(options)"
              type="text"
              name="company"
              id="Company"
            />
            <label htmlFor="Company">Company Name(options)</label>
          </div>
          <div className="relative">
            <input
              placeholder="Street Address"
              type="text"
              name="street"
              id="Street"
            />
            <label htmlFor="Street">Street Address</label>
            {formState?.zodErrors?.street && (
              <span className="mt-1 text-red-500 text-xs font-medium">
                {formState.zodErrors.street[0]}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              placeholder="Apt, suite, unit(options)"
              type="text"
              name="apt"
              id="Apt"
            />
            <label htmlFor="Apt">Apt, suite, unit(options)</label>
          </div>
          <div className="relative">
            <input
              onChange={(e) => handleStateFilter(e)}
              onFocus={() => setStateFocus(true)}
              ref={stateRef}
              placeholder="State"
              type="text"
              name="state"
              id="State"
            />
            <label htmlFor="State">State</label>
            {formState?.zodErrors?.state && (
              <span className="mt-1 text-red-500 text-xs font-medium">
                {formState.zodErrors.state[0]}
              </span>
            )}
            <div
              className={`${
                stateFocus ? "block" : "hidden"
              } absolute z-40 max-h-[200px] w-full left-0 top-[50px] bg-colorGrayFive rounded-md flex flex-col justify-start overflow-y-auto shadow-md`}
            >
              {stateList.map((state, i) => {
                return (
                  <button
                    onClick={(e) => {
                      selectState(e, { name: state.name, id: state.id });
                    }}
                    key={i}
                    className="py-1 px-2 hover:bg-colorGrayThree"
                  >
                    <div className="flex items-center gap-x-1">
                      <h1 className="text-sm">{state.name}</h1>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <input
              onChange={(e) => handleCityFilter(e)}
              onFocus={() => setCityFocus(true)}
              ref={cityRef}
              placeholder="City"
              type="text"
              name="city"
              id="City"
            />
            <label htmlFor="State">City</label>
            {formState?.zodErrors?.city && (
              <span className="mt-1 text-red-500 text-xs font-medium">
                {formState.zodErrors.city[0]}
              </span>
            )}
            <div
              className={`${
                cityFocus ? "block" : "hidden"
              } absolute z-40 max-h-[200px] w-full left-0 top-[50px] bg-colorGrayFive rounded-md flex flex-col justify-start overflow-y-auto shadow-md`}
            >
              {cityList.map((city, i) => {
                return (
                  <button
                    onClick={(e) => {
                      selectCity(e, { name: city.name, id: city.id });
                    }}
                    key={i}
                    className="py-1 px-2 hover:bg-colorGrayThree"
                  >
                    <div className="flex items-center gap-x-1">
                      <h1 className="text-sm">{city.name}</h1>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col">
              <input
                ref={phoneRef}
                placeholder="Phone Number"
                type="text"
                name="phone"
                id="Phone"
              />
              <label htmlFor="Phone">Phone Number</label>
              {formState?.zodErrors?.phone && (
                <span className="mt-1 text-red-500 text-xs font-medium">
                  {formState.zodErrors.phone[0]}
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              placeholder="Postal Code"
              type="text"
              name="postal_code"
              id="Postal"
            />
            <label htmlFor="Postal">Postal Code</label>
          </div>
        </div>
        <div className="relative my-6">
          <textarea
            className="resize-none w-full h-[150px] mt-1"
            placeholder="Delivery Instruction"
            name="delivery_instruction"
            id="Delivery_Instruction"
          ></textarea>
          <label htmlFor="Delivery_Instruction">Delivery Instruction</label>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <input type="checkbox" name="default_shipping" id="shipping" />
            <label htmlFor="shipping">
              <h1 className="text-colorGrayOne">
                Set as default shipping address
              </h1>
            </label>
          </div>
          <div className="flex items-center gap-x-2 my-3">
            <input type="checkbox" name="default_billing " id="billing" />
            <label htmlFor="billing">
              <h1 className="text-colorGrayOne">
                Set as default billing address
              </h1>
            </label>
          </div>
          <div className="flex items-center mt-6">
            <SubmitButton />
            <Link href={"/"}>
              <button className="px-3 py-2 bg-colorGrayFour text-colorGrayThree rounded-md">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormAddress;
