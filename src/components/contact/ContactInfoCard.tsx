
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from "./ContactInfo";
import { SocialLinks } from "./SocialLinks";

export function ContactInfoCard() {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ContactInfo />
        <SocialLinks />
      </CardContent>
    </Card>
  );
}
