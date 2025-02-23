function Error({
  title = "Oops! Page not found",
  description = "We are sorry, but the page you requested was not found",
  code = "404",
}: {
  title?: string;
  description?: string;
  code?: string;
}) {
  return (
    <div className="bg-background text-foreground h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="space-y-4">
        <h2 className="text-8xl mb-4">{code}</h2>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default Error;
