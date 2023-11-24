"use client";

import React from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const isActive = "newest";

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 capitalize shadow-none text-primary-500 ${
            isActive === item.value
              ? "bg-primar-100"
              : "dark:text-light-500 bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:hover:bg-dark-300"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
