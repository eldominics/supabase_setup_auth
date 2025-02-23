import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalUserContextParams {
  user: any;
  session: Session | null;
}

interface UserParams {
  avatar_url: string;
  email: string;
  id: any;
}

const GlobalUserContext = createContext<GlobalUserContextParams | undefined>(
  undefined
);

export const GlobalUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserParams | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log("within useEffect");
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: user, error } = await supabase
          .from("eldics_users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          return console.log("The error-->", error);
        } else {
          setUser(user);
        }
      }
    };

    try {
      fetchSession();

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          // Clear all state when user signs out
          setSession(null);
          setUser(null);
        }

        if (event === "SIGNED_IN") {
          fetchSession(); // Fetch new session on sign-in
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GlobalUserContext.Provider
      value={{
        user,
        session,
      }}
    >
      {children}
    </GlobalUserContext.Provider>
  );
};

export const UseGlobalUserContext = () => {
  const context = useContext(GlobalUserContext);

  if (context === undefined) {
    throw new Error("must be used within a UseGlobalUserContext Component");
  }
  return context;
};
