import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lvhyctrolcfedujsavhj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHljdHJvbGNmZWR1anNhdmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMTYyNTUsImV4cCI6MjA0NDc5MjI1NX0.wxIEtgt3yvStPgw3trYQDMRnXDOIlQgFteZXGbyDb_s";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const insertUserTest = async () => {
    const { data, error } = await supabase
    .from('Users')
    .insert({
        email: "test1@test.com",
        display_name: "test1233",
        id: "1234567899",
    })

    console.log(data);
    console.log(error);
}
