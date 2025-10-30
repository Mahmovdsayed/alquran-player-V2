import { toast } from "sonner";

export const handleShare = async (url: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        url,
      });
    } catch (err) {
      toast.error("Failed to share the link!");
    }
  } else {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  }
};
