
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function getStrapiURL() {
  return process.env.MAIN_HOST ?? "http://127.0.0.1:1337/";
}
