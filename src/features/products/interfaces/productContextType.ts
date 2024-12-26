export interface ProductContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    category: string;
    setCategory: (category: string) => void;
  }