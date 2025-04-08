
-- Create a function to get database version (for connection testing)
CREATE OR REPLACE FUNCTION public.version()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT version();
$$;

-- Create a function to get table names
CREATE OR REPLACE FUNCTION public.get_tables()
RETURNS TABLE (table_name text)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT tablename::text as table_name
  FROM pg_tables
  WHERE schemaname = 'public';
$$;

-- Create a function to check if a table exists
CREATE OR REPLACE FUNCTION public.table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = $1
  );
END;
$$;

-- Make these functions available to anon users
GRANT EXECUTE ON FUNCTION public.version TO anon;
GRANT EXECUTE ON FUNCTION public.get_tables TO anon;
GRANT EXECUTE ON FUNCTION public.table_exists TO anon;
