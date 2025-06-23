import { useEffect, useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { getUser } from '~/lib/auth';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      if (user) {
        router.replace('/'); // 🔥 Arahkan jika user sudah login
      } else {
        setLoading(false); // 🔥 Jika tidak ada user, tampilkan form login/signup
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'landingPag' }} />
    </Stack>
  );
}
