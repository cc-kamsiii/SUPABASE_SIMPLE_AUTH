import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // REGISTER NEW USER
    const registerNewUser = async (email, password) =>{
        const {data, error} = await supabase.auth.signUp({
            email: email.trim(),
            password: password.trim(),
        })

        if(error){
            console.error("Error in registering new user", error)   
            return {success: false, error: error.message}
        }
        return {success: true, data}
    }

    // LOGIN USER
    const loginUser = async (email, password) =>{
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if(error){
                console.error("Error in logging-in", error)
                return{ success: false, error: error.message }
            }
            console.log("Login success!", data)
            return{success: true, data}
        } catch (error) {
            console.error("an error occurred", error)
            return {success: false, error: error.message}
        }
    }

    useEffect(() =>{
        // Get initial session
        supabase.auth.getSession().then(({data: {session}}) =>{
            setSession(session);
            setLoading(false);
        })

        // Listen for auth changes
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (_event, session) =>{
                setSession(session)
            }
        );

        return () =>{
            subscription.unsubscribe();
        }

    }, [])

    // SIGN OUT
    const signOut = async () =>{
        const {error} = await supabase.auth.signOut();
        if(error){
            console.log(error)
            return {success: false, error: error.message}
        }
        return {success: true}
    }

    return(
        <AuthContext.Provider value={{session, loading, registerNewUser, loginUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(AuthContext);
}