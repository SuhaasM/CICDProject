const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
// You will need to add these as Environment Variables in Render later
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// User Signup
const signup = async (req, res) => {
    const { email, password, username, role } = req.body;
    
    // Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) return res.status(400).json({ error: authError.message });

    // If signup is successful, insert the user's role and username into the profiles table
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: authData.user.id, username, role });

    if (profileError) return res.status(400).json({ error: profileError.message });

    res.status(200).json({ user: authData.user });
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    
    // We also need to fetch the user's role from the profiles table
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
    
    if (profileError) return res.status(400).json({ error: profileError.message });

    // Combine auth data with profile data
    const userWithRole = { ...data.user, role: profileData.role };

    res.status(200).json({ session: data.session, user: userWithRole });
};

module.exports = { signup, login };