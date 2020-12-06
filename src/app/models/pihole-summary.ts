export interface Relative {
  days: number;
  hours: number;
  minutes: number;
}

export interface GravityLastUpdated {
  file_exists: boolean;
  absolute: number;
  relative: Relative;
}

export interface PiholeSummary {
  domains_being_blocked: string;
  dns_queries_today: string;
  ads_blocked_today: string;
  ads_percentage_today: string;
  unique_domains: string;
  queries_forwarded: string;
  queries_cached: string;
  clients_ever_seen: string;
  unique_clients: string;
  dns_queries_all_types: string;
  reply_NODATA: string;
  reply_NXDOMAIN: string;
  reply_CNAME: string;
  reply_IP: string;
  privacy_level: string;
  status: string;
  gravity_last_updated: GravityLastUpdated;
}
