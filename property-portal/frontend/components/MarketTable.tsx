export default function MarketTable({ data }: any) {
  return (
    <table className="mt-4 w-full bg-white border">
      <tbody>
        <tr><td>Average Price</td><td>{data.average_price}</td></tr>
        <tr><td>Top City</td><td>{data.top_city}</td></tr>
        <tr><td>Total Properties</td><td>{data.total_properties}</td></tr>
      </tbody>
    </table>
  );
}
