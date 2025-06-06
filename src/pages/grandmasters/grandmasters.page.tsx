import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/layout.component";
import { getGrandmastersAPI } from "../../api/grandmasters/grandmasters.api";
import { Pagination } from "../../components/pagination.component";
import { useManualPagination } from "../../hooks/useManualPagination";
import { SkeletonList } from "../../components/layout/skeleton/list.component";
import { SkeletonBlock } from "../../components/layout/skeleton/block.component";
import { Link } from "react-router";
import { ROUTE_GRANDMASTERS } from "../../utils/route.utils";

const PAGE_SIZE = 15;

export function Grandmasters() {
  const [isLoading, setIsLoading] = useState(false);
  const [allGrandmasters, setAllGrandmasters] = useState<string[]>([]);

  const {
    currentItems: grandmasters,
    goToPage,
    currentPage,
  } = useManualPagination(allGrandmasters, PAGE_SIZE);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const { data } = await getGrandmastersAPI();
        const resultData = data?.players || [];

        setAllGrandmasters(resultData);
      } catch (error) {
        console.error("Error in fetching grandmasters: ", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }

    loadData();
  }, []);

  function onPageChange(pageNumber: number) {
    goToPage(pageNumber);
  }

  const totalCount = allGrandmasters.length || 0;

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col items-start justify-between md:items-end md:py-4 md:flex-row">
        <h1 className="m-0 p-0 text-3xl font-medium text-gray-800">
          Grandmasters
        </h1>

        {isLoading ? (
          <SkeletonBlock />
        ) : (
          <span className="font-medium text-gray-500">
            {new Intl.NumberFormat().format(totalCount)} grandmaster
            {totalCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <SkeletonList itemCount={PAGE_SIZE} />
      ) : (
        <>
          {/* Content */}
          <ul className="divide-y divide-gray-200 pt-4">
            {grandmasters.map((username) => (
              <li className="py-2 hover:bg-gray-100 transition" key={username}>
                <div className="px-2  ">
                  <Link
                    to={`${ROUTE_GRANDMASTERS}/${username}`}
                    className="hover:text-gray-800 hover:cursor-pointer hover:font-medium transition"
                  >
                    {username}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <Pagination
        isLoading={isLoading}
        totalItems={totalCount}
        itemsPerPage={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </Layout>
  );
}
