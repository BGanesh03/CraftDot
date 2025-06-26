import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "use supabase url
const supabaseAnonKey = 'use anon key'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    
    // Optional: Add a session check utility
    export async function signInWithPassword(email, password) {
        try {
          // Detailed login method with comprehensive error handling
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
          });
      
          if (error) {
            console.error('Login Error:', error.message);
            throw error;
          }
      
          if (data.session) {
            // Manually store tokens for extra reliability
            await AsyncStorage.setItem('sb-access-token', data.session.access_token);
            await AsyncStorage.setItem('sb-refresh-token', data.session.refresh_token);
            
            console.log('Login Successful:', data.user?.email);
            return data;
          }
      
          console.error('No session created');
          return null;
        } catch (err) {
          console.error('Unexpected Login Error:', err);
          return null;
        }
      }
      
      // Debugging function to check current authentication state
      export async function checkAuthenticationState() {
        try {
          // Get current session
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          console.log('Current Session:', JSON.stringify(sessionData, null, 2));
          
          if (sessionError) {
            console.error('Session Check Error:', sessionError);
          }
      
          // Get current user
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          console.log('Current User:', JSON.stringify(userData, null, 2));
          
          if (userError) {
            console.error('User Check Error:', userError);
          }
      
          return {
            session: sessionData?.session,
            user: userData?.user
          };
        } catch (err) {
          console.error('Authentication State Check Failed:', err);
          return null;
        }
      }
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth State Change Event:', {
          event,
          sessionExists: !!session,
          userEmail: session?.user?.email
        });
      
        if (session?.user) {
          // Optional: Additional actions on authentication state change
        }
      });
    
