export interface Report {
  id: string;
  companyName: string;
  score: number;
  status: 'draft' | 'submitted';
  createdAt: string;
}