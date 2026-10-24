-- 001_create_leads.sql
-- Table to store discovered restaurant leads in Pune

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    place_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    formatted_address TEXT,
    national_phone_number TEXT,
    rating NUMERIC(2,1),
    user_rating_count INTEGER,
    price_level TEXT,
    primary_type TEXT,
    google_maps_uri TEXT,
    opening_hours JSONB,
    raw_photo_references JSONB DEFAULT '[]'::jsonb,
    curated_photos JSONB DEFAULT '[]'::jsonb,
    top_reviews JSONB DEFAULT '[]'::jsonb,
    menu_items JSONB DEFAULT '[]'::jsonb,
    contact_email TEXT,
    whatsapp_number TEXT,
    instagram_handle TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on place_id and status for speedy lookups
CREATE INDEX IF NOT EXISTS idx_leads_place_id ON leads(place_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_area ON leads(area);
