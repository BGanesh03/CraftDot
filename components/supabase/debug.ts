import React from 'react';
import { supabase } from '@/components/supabase/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function performAuthenticationDiagnostics() {
  try {
    // 1. Check AsyncStorage directly
    const storedSession = await AsyncStorage.getItem('sb-access-token');
    console.log('Stored Session Token:', !!storedSession);

    // 2. Attempt to get current session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log('Session Data:', JSON.stringify(sessionData, null, 2));
    
    if (sessionError) {
      console.error('Session Retrieval Error:', sessionError);
    }

    // 3. Try to get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('User Data:', JSON.stringify(userData, null, 2));
    
    if (userError) {
      console.error('User Retrieval Error:', userError);
    }

    // 4. Comprehensive authentication state check
    const currentSession = sessionData?.session;
    const currentUser = userData?.user;

    console.log('Detailed Authentication Diagnostics:');
    console.log('Session Exists:', !!currentSession);
    console.log('User Authenticated:', !!currentUser);
    
    if (currentSession) {
      console.log('Session Expiration:', currentSession.expires_at);
      console.log('Session Token Valid:', !!currentSession.access_token);
    }

    // 5. Check token storage
    const accessToken = await AsyncStorage.getItem('sb-access-token');
    const refreshToken = await AsyncStorage.getItem('sb-refresh-token');
    
    console.log('Access Token Present:', !!accessToken);
    console.log('Refresh Token Present:', !!refreshToken);

  } catch (err) {
    console.error('Comprehensive Authentication Diagnostic Failed:', err);
  }
}

// Enhanced Supabase Client Configuration
export function configureSupabaseClient() {
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth State Change:', {
      event,
      sessionExists: !!session,
      userEmail: session?.user?.email
    });

    if (session?.user) {
      // Persist tokens manually if needed
      AsyncStorage.setItem('sb-access-token', session.access_token);
      AsyncStorage.setItem('sb-refresh-token', session.refresh_token);
    }
  });
}

// Manual Token Refresh Utility
export async function manualTokenRefresh() {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Manual Token Refresh Error:', error);
      return false;
    }
    
    if (data.session) {
      console.log('Token Successfully Refreshed');
      return true;
    }
  } catch (err) {
    console.error('Unexpected Token Refresh Error:', err);
    return false;
  }
}

// Usage in a component or authentication flow
export function AuthenticationHandler() {
  React.useEffect(() => {
    // Run diagnostics and configuration
    performAuthenticationDiagnostics();
    const { data: authListener } = configureSupabaseClient();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return null; // This is a utility component
}