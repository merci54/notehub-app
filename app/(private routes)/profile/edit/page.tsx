"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (formData: FormData) => {
    try {
      const newUsername = formData.get("username") as string;
      setUsername(newUsername);
      const updated = await updateMe({ username });

      setUser(updated);

      router.push("/profile");
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      return;
    }
    (async () => {
      try {
        const me = await getMe();
        if (me) {
          setUsername(me.username ?? "");
          setUser(me);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    })();
  }, [user, setUser]);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <div className={css.imageBlock}>
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>

        <form className={css.profileInfo} action={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              name="username"
              id="username"
              type="text"
              value={username}
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
