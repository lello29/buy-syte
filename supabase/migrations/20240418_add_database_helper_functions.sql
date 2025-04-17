
-- Create a function to get all RLS policies in the database
CREATE OR REPLACE FUNCTION public.get_rls_policies()
RETURNS TABLE (
  table_schema text,
  table_name text,
  policy_name text,
  roles text[],
  cmd text,
  qual text,
  with_check text,
  description text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.nspname::text AS table_schema,
    c.relname::text AS table_name,
    p.polname::text AS policy_name,
    p.polroles AS roles,
    CASE
        WHEN p.polcmd = 'r' THEN 'SELECT'
        WHEN p.polcmd = 'a' THEN 'INSERT'
        WHEN p.polcmd = 'w' THEN 'UPDATE'
        WHEN p.polcmd = 'd' THEN 'DELETE'
        WHEN p.polcmd = '*' THEN 'ALL'
    END AS cmd,
    pg_get_expr(p.polqual, p.polrelid)::text AS qual,
    pg_get_expr(p.polwithcheck, p.polrelid)::text AS with_check,
    obj_description(p.oid, 'pg_policy') AS description
  FROM
    pg_policy p
    JOIN pg_class c ON p.polrelid = c.oid
    JOIN pg_namespace n ON c.relnamespace = n.oid
  WHERE
    n.nspname = 'public'
  ORDER BY
    table_name, policy_name;
END;
$$;

-- Make the function available for anon access
GRANT EXECUTE ON FUNCTION public.get_rls_policies TO anon;

-- Create a function to execute SQL (needs to be a function with security admin privileges)
CREATE OR REPLACE FUNCTION public.execute_sql(sql_command text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_command;
END;
$$;

-- Create a function to get the database schema
CREATE OR REPLACE FUNCTION public.get_schema()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  schema_content text;
BEGIN
  -- Output the schema as a SQL script
  WITH tables AS (
    SELECT 
      'CREATE TABLE ' || table_schema || '.' || table_name || ' (' || 
      string_agg(
        column_name || ' ' || data_type || 
        CASE 
          WHEN character_maximum_length IS NOT NULL THEN '(' || character_maximum_length || ')'
          ELSE ''
        END || 
        CASE 
          WHEN is_nullable = 'NO' THEN ' NOT NULL'
          ELSE ''
        END ||
        CASE 
          WHEN column_default IS NOT NULL THEN ' DEFAULT ' || column_default
          ELSE ''
        END,
        ', '
      ) || ');' AS create_statement
    FROM 
      information_schema.columns
    WHERE 
      table_schema = 'public'
    GROUP BY 
      table_schema, table_name
  )
  SELECT 
    string_agg(create_statement, E'\n\n')
  INTO 
    schema_content
  FROM 
    tables;
  
  RETURN schema_content;
END;
$$;

-- Make the function available for anon access
GRANT EXECUTE ON FUNCTION public.get_schema TO anon;
