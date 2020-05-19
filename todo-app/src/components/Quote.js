import React from "react";
import { useFetch } from "react-async";

function Quote() {
  const { data, isLoading, error } = useFetch(
    `https://quotes15.p.rapidapi.com/quotes/random/`,
    {
      headers: {
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"quotes15.p.rapidapi.com",
        "x-rapidapi-key":"05a9e3db6dmshfd21663b037bf61p15838djsnafe1ac4f6bb3",
        "useQueryString":true
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Something went wrong: ${error.message}</div>;

  if (data)
  console.log(data);
    return (
      <div class="container border rounded bg-light w-50 mx-auto mt-5 p-3">
        <div>
          <h2 class="mt-2 mb-4">
            Random Quote
          </h2>
        </div>
        {data.products.map((quote) => (
          <div key={quote.id} className="row">
            <div className="col-md-12">
              <p>
                {quote.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Quote;