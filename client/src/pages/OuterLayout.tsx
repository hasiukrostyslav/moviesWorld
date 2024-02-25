import { Outlet } from 'react-router-dom';

function OuterLayout() {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <section className="bg-movies h-pad flex justify-end bg-cover bg-no-repeat">
        <div className="clipped flex basis-3/6 items-center justify-center bg-slate-100 py-6 pl-36 pr-6">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default OuterLayout;
