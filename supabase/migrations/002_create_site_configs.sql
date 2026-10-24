-- 002_create_site_configs.sql
-- Table to store multi-tenant website configurations for restaurant demos

CREATE TABLE IF NOT EXISTS site_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    restaurant JSONB NOT NULL,
    theme JSONB NOT NULL,
    assets JSONB NOT NULL,
    menu JSONB DEFAULT '[]'::jsonb,
    reviews JSONB DEFAULT '[]'::jsonb,
    pricing JSONB NOT NULL,
    demo JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on slug for fast routing in Next.js multi-tenant middleware
CREATE INDEX IF NOT EXISTS idx_site_configs_slug ON site_configs(slug);
