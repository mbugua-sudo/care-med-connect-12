
-- Create custom types
CREATE TYPE public.app_role AS ENUM ('admin', 'pharmacist', 'user');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE public.prescription_status AS ENUM ('uploaded', 'verified', 'processed', 'filled');
CREATE TYPE public.record_type AS ENUM ('blood_pressure', 'blood_sugar', 'weight', 'temperature', 'heart_rate');

-- Create user profiles table with trigger
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  phone VARCHAR,
  date_of_birth DATE,
  profile_image VARCHAR,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create user addresses table
CREATE TABLE public.user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  address_line_1 VARCHAR NOT NULL,
  address_line_2 VARCHAR,
  city VARCHAR NOT NULL,
  county VARCHAR,
  postal_code VARCHAR,
  country VARCHAR DEFAULT 'Kenya',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create conditions table
CREATE TABLE public.conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medicines table
CREATE TABLE public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  brand VARCHAR,
  generic_name VARCHAR,
  category_id UUID REFERENCES public.categories(id),
  description TEXT,
  active_ingredients TEXT,
  strength VARCHAR,
  form VARCHAR,
  pack_size INTEGER,
  price INTEGER NOT NULL,
  original_price INTEGER,
  cost_price INTEGER,
  sku VARCHAR UNIQUE,
  barcode VARCHAR,
  requires_prescription BOOLEAN DEFAULT false,
  is_prescription_only BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 10,
  max_stock_level INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  weight_grams DECIMAL,
  expiry_date DATE,
  manufacturer VARCHAR,
  country_of_origin VARCHAR,
  storage_instructions TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medicine images table
CREATE TABLE public.medicine_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE NOT NULL,
  image_url VARCHAR NOT NULL,
  alt_text VARCHAR,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medicine conditions junction table
CREATE TABLE public.medicine_conditions (
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  condition_id UUID REFERENCES public.conditions(id) ON DELETE CASCADE,
  PRIMARY KEY (medicine_id, condition_id)
);

-- Create shopping cart table
CREATE TABLE public.shopping_cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, medicine_id)
);

-- Create user favorites table
CREATE TABLE public.user_favorites (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, medicine_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number VARCHAR UNIQUE NOT NULL,
  status order_status DEFAULT 'pending',
  subtotal INTEGER NOT NULL,
  delivery_fee INTEGER DEFAULT 0,
  tax_amount INTEGER DEFAULT 0,
  discount_amount INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  delivery_address_id UUID REFERENCES public.user_addresses(id),
  delivery_method VARCHAR,
  payment_method VARCHAR,
  payment_status payment_status DEFAULT 'pending',
  notes TEXT,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  medicine_id UUID REFERENCES public.medicines(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(medicine_id, user_id)
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prescription_number VARCHAR,
  doctor_name VARCHAR,
  doctor_license VARCHAR,
  hospital_clinic VARCHAR,
  prescription_date DATE,
  expiry_date DATE,
  image_url VARCHAR,
  status prescription_status DEFAULT 'uploaded',
  notes TEXT,
  pharmacist_notes TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create prescription items table
CREATE TABLE public.prescription_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID REFERENCES public.prescriptions(id) ON DELETE CASCADE NOT NULL,
  medicine_id UUID REFERENCES public.medicines(id),
  dosage VARCHAR,
  frequency VARCHAR,
  duration VARCHAR,
  quantity_prescribed INTEGER,
  special_instructions TEXT,
  is_available BOOLEAN DEFAULT true
);

-- Create health records table
CREATE TABLE public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  record_type record_type NOT NULL,
  value DECIMAL NOT NULL,
  unit VARCHAR,
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medication reminders table
CREATE TABLE public.medication_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medicine_id UUID REFERENCES public.medicines(id),
  reminder_name VARCHAR NOT NULL,
  dosage VARCHAR,
  frequency VARCHAR,
  times JSONB,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  license_number VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  address_line_1 VARCHAR NOT NULL,
  address_line_2 VARCHAR,
  city VARCHAR NOT NULL,
  county VARCHAR,
  postal_code VARCHAR,
  latitude DECIMAL,
  longitude DECIMAL,
  operating_hours JSONB,
  services JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pharmacy stock table
CREATE TABLE public.pharmacy_stock (
  pharmacy_id UUID REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  price INTEGER,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (pharmacy_id, medicine_id)
);

-- Create search history table
CREATE TABLE public.search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query VARCHAR NOT NULL,
  results_count INTEGER DEFAULT 0,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create recently viewed table
CREATE TABLE public.recently_viewed (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  medicine_id UUID REFERENCES public.medicines(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, medicine_id)
);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to check user roles (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Insert some sample data
INSERT INTO public.categories (name, slug, description) VALUES
  ('Pain Relief', 'pain-relief', 'Medicines for pain management'),
  ('Vitamins', 'vitamins', 'Nutritional supplements and vitamins'),
  ('Supplements', 'supplements', 'Health supplements and minerals'),
  ('Antibiotics', 'antibiotics', 'Prescription antibiotics'),
  ('Cold & Flu', 'cold-flu', 'Cold and flu medications');

INSERT INTO public.conditions (name, slug, description) VALUES
  ('Diabetes', 'diabetes', 'Medicines for diabetes management'),
  ('Hypertension', 'hypertension', 'Blood pressure medications'),
  ('Headache', 'headache', 'Headache and migraine relief'),
  ('Fever', 'fever', 'Fever reduction medications'),
  ('Allergy', 'allergy', 'Allergy and antihistamine medications');
