-- 003_create_outreach_log.sql
-- Table to log outreach attempts across WhatsApp, Email, and Instagram

CREATE TABLE IF NOT EXISTS outreach_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    channel TEXT NOT NULL, -- 'whatsapp', 'email', 'instagram'
    recipient TEXT NOT NULL,
    message_body TEXT,
    screenshot_url TEXT,
    status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'replied', 'failed'
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    response_at TIMESTAMPTZ,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_outreach_lead_id ON outreach_logs(lead_id);
