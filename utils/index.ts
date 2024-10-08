import { CarProps, FilterProps } from "@/types";

// Base price factors
const basePricePerDay = 50; // Base rental price per day in dollars
const mileageFactor = 0.1; // Additional rate per mile driven
const ageFactor = 0.05; // Additional rate per year of vehicle age

// Calculate car rental price based on mileage and year
export const calculateCarRent = (city_mpg: number, year: number) => {
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

// Update URL search params
export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

// Delete URL search params
export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLowerCase());
  return `${window.location.pathname}?${newSearchParams.toString()}`;
};

// Fetch cars from API
export const fetchCars = async (filters: FilterProps) => {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Construct the API URL with search filters
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

  try {
    // Perform the fetch request
    const response = await fetch(url, { headers });

    // Parse and return the JSON result
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching cars data:", error);
    throw error;
  }
};
