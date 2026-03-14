import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export interface PharmaProfile {
  id: string;
  pharmacy_name: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  license_number: string | null;
}

export function usePharmaContext() {
  const navigate = useNavigate();
  const [pharma, setPharma] = useState<PharmaProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/pharma/login', { replace: true });
        return;
      }
      
      const role = user.user_metadata?.role;
      if (role !== 'pharma') {
        navigate('/', { replace: true });
        return;
      }

      // Fetch existing pharmacy profile from the database
      let { data: profile } = await supabase.from('pharmacies' as any).select('*').eq('id', user.id).single();

      // Auto-create profile if first time logging in
      if (!profile) {
        const newPharma: PharmaProfile = {
          id: user.id,
          pharmacy_name: user.user_metadata?.pharmacy_name || user.user_metadata?.full_name || 'Partner Pharmacy Hub',
          owner_name: user.user_metadata?.full_name || 'Owner',
          email: user.email || '',
          phone: null,
          address: null,
          license_number: null
        };
        const { data: inserted, error } = await supabase.from('pharmacies' as any).insert([newPharma]).select().single();
        if (!error && inserted) {
           profile = inserted as any;
        } else {
           profile = newPharma as any; // Fallback to local if table isn't created yet
        }
      }

      setPharma(profile as unknown as PharmaProfile);
      setAuthorized(true);
      setLoading(false);
    };
    check();
  }, [navigate]);

  return { pharma, loading, authorized };
}
