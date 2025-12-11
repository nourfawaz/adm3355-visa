import VisaLogo from "../VisaLogo";

export default function VisaLogoExample() {
  return (
    <div className="flex gap-8 items-center p-4">
      <div className="bg-primary p-4 rounded-md">
        <VisaLogo variant="light" className="w-20" />
      </div>
      <div className="bg-white p-4 rounded-md border">
        <VisaLogo variant="dark" className="w-20" />
      </div>
    </div>
  );
}
