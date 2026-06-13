export type CarCategory =
  | "Supercar"
  | "JDM"
  | "German"
  | "Muscle"
  | "Drift"
  | "VIP"
  | "Classic"
  | "Other";

export type TicketType = "Standard" | "Premium";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface CarRegistration {
  id: string;
  full_name: string;
  car_brand: string;
  car_category: CarCategory;
  manufacturing_year: number;
  plate_number: string;
  phone_number: string;
  car_image: string;
  approval_status: ApprovalStatus;
  created_at: string;
}

export interface Ticket {
  id: string;
  ticket_type: TicketType;
  full_name: string;
  phone_number: string;
  email: string;
  quantity: number;
  qr_code: string | null;
  qr_used: boolean;
  created_at: string;
}

export interface Volunteer {
  id: string;
  full_name: string;
  age: number;
  phone_number: string;
  agreed_to_volunteer: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "super_admin" | "editor" | "viewer";
}
