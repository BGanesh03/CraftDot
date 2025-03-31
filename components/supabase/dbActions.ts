import { supabase } from "./supabase";

export async function getUserByMail(email: String) {
  const { data, error } = await supabase
    .from("users")
    .select("name, email, mobile")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return;
  }

  //console.log("User:", data);

  return data;
}
