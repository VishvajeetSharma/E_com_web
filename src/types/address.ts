export interface Address {
  id?: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "work" | "other";
  isDefault: boolean;
}
