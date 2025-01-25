const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:grid grid-cols-3 gap-6 bg-base-200 p-12">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="p-4 bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition duration-300"
          >
            <h3 className="font-semibold text-lg"></h3>
            <p className="text-sm text-base-content/60"></p>
          </div>
        ))}
        <div className="col-span-3 text-center mt-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  

  
 
  
  export default AuthImagePattern;
  