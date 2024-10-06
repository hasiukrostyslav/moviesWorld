import { useNavigate } from 'react-router-dom';
import { useSearchTabs } from '../hooks/useSearchTabs';
import { useGetSearchedItemsQuery } from '../store';
import Spinner from '../components/Spinner';
import ErrorPage from './ErrorPage';
import SearchedList from '../components/SearchedList';
import Tabs from '../components/Tabs';
import Button from '../components/Button';

function SearchPage() {
  const navigate = useNavigate();
  const {
    params: { query, type, searchId, remain },
    searchString,
  } = useSearchTabs();

  const { data, isFetching, isError } = useGetSearchedItemsQuery({
    query,
    searchId,
    type,
    remain,
  });

  if (isFetching && !data) return <Spinner />;
  if (isError) return <ErrorPage code={500} message="Internal Server Error" />;

  if (data) {
    const {
      data: searchedData,
      page,
      totalPages,
      results,
      resultPerPage,
    } = data.data;

    console.log(data);

    return (
      <section className="flex flex-col py-20">
        <h2 className="text-2xl font-semibold">
          Search results:{' '}
          <span className="text-xl font-medium text-slate-700 dark:text-slate-400">
            "{query}"
          </span>
        </h2>
        <Tabs />
        <SearchedList searchedItems={searchedData} />
      </section>
    );
  }
}
export default SearchPage;
