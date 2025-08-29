import { SiPaytm, SiGooglepay, SiPhonepe, SiAmazonpay } from "react-icons/si";
import { Wallet, CreditCard } from "lucide-react";

export const bankOptions = [
  {
    id: 1,
    name: "State Bank of India",
    imgSrc: "https://images.unsplash.com/photo-1612810637584-649100a62951",
    icon: CreditCard
  },
  {
    id: 2,
    name: "HDFC Bank",
    imgSrc: "https://images.unsplash.com/photo-1693801873650-b1091c25abbf",
    icon: CreditCard
  },
  {
    id: 3,
    name: "ICICI Bank",
    imgSrc: "https://images.unsplash.com/photo-1692565649291-0341123f29d9",
    icon: CreditCard
  },
  {
    id: 4,
    name: "Axis Bank",
    imgSrc: "https://images.unsplash.com/photo-1679676057052-69f07449ea8e",
    icon: CreditCard
  },
  {
    id: 5,
    name: "Kotak Mahindra Bank",
    imgSrc: "https://images.unsplash.com/photo-1678564205744-3dc5913fc3fe",
    icon: CreditCard
  },
  {
    id: 6,
    name: "Yes Bank",
    imgSrc: "https://images.unsplash.com/photo-1622630732278-ca6d08c52b6f",
    icon: CreditCard
  }
];

export const popularPayments = [
  {
    id: 1,
    name: "Paytm",
    icon: SiPaytm,
    imgSrc: "https://images.unsplash.com/photo-1509017174183-0b7e0278f1ec"
  },
  {
    id: 2,
    name: "Google Pay",
    icon: SiGooglepay,
    imgSrc: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f"
  },
  {
    id: 3,
    name: "PhonePe",
    icon: SiPhonepe,
    imgSrc: "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319"
  },
  {
    id: 4,
    name: "Amazon Pay",
    icon: SiAmazonpay,
    imgSrc: "https://images.unsplash.com/photo-1733506903133-9d65b66d299a"
  },
  {
    id: 5,
    name: "UPI",
    icon: Wallet,
    imgSrc: "https://images.unsplash.com/photo-1639189702833-8de5ecf2ca8f"
  },
  {
    id: 6,
    name: "Credit/Debit Card",
    icon: CreditCard,
    imgSrc: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49"
  }
];
