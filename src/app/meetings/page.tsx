"use client";

import { SmallCard } from "@/components/ui/SmallCard/SmallCard";
import cls from "./styles.module.scss";
import OnlineIcon from "@/assets/icons/icons/online.svg";
import PenIcon from "../../../../assets/icons/icons/pen.svg";
import CityIcon from "@/assets/icons/icons/city.svg";
import { Button } from "@/components/ui";
import PlaceFilter from "@/components/ui/PlaceFilter/ui/PlaceFilter";
import { Tab, Tabs } from "@/components/ui/Tabs/Tabs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { FiltersEventsWrapper } from "@/components/ui/FiltersEventsWrapper/FiltersEventsWrapper";
import { getFiltersRole } from "@/core/store/slices/filtersRoleSlice";
import { useSelector } from "react-redux";
import { getAllEvents } from "@/core/store/slices/eventsSlice";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchEvents } from "@/core/store/services/fetchEvents";

export default function MeetingsPage() {
  const { filteredEvents, error, isLoading } = useSelector(getAllEvents);
  const tabs = useMemo<Tab[]>(
    () => [{ title: "Все мероприятия" }, { title: "Участвую" }, { title: "Провожу" }],
    [],
  );
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [storedCities, setStoredCities] = useState<string[]>(createInitialCities);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const filters = useSelector(getFiltersRole);
  const dispatch = useAppDispatch();
  const itemsPerPage = 6;
  const offset = (currentPage - 1) * itemsPerPage;

  const clickHandleTab = useCallback((title: string) => {
    setSelectedTab(title);
  }, []);

  const onLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onOpenFilters = () => {
    setIsOpenFilter(true);
  };

  const onCloseFilters = useCallback(() => {
    setIsOpenFilter(false);
  }, []);

  // const getFilteredEvents = useMemo(() => {
  //   return events?.filter((value) => {
  //     if (filters.length > 0) {
  //       console.log(value.roles.split(";"));
  //       return compareArrays(value.roles.split(";"), filters);
  //     }
  //   });
  // }, [events, filters]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <section>
      <button onClick={onOpenFilters}>Кнопка фильтров</button>
      <FiltersEventsWrapper isOpen={isOpenFilter} onClose={onCloseFilters}></FiltersEventsWrapper>
      <div className={cls.filtersWrapper}>
        <div className={cls.buttonWrapper}>
          <Tabs
            tabs={tabs}
            selected={selectedTab}
            onTabClick={clickHandleTab}
            numberSelected={filteredEvents?.length}
          />
        </div>
        <div>
          <div className={cls.citiesWrapper}>
            {storedCities.map((city) => (
              <PlaceFilter
                text={city}
                key={city}
                disabled
                Svg={city === "Онлайн" ? OnlineIcon : CityIcon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={cls.eventsWrapper}>
        {isLoading && <h5>Загрузка данных...</h5>}
        {error && <h5>При загрузке данных произошла ошибка</h5>}
        {filteredEvents &&
          filteredEvents.map((event) => <SmallCard event={event} key={event.id} />)}
      </div>
      <Button onClick={onLoadMore} variant="loadMore" className={cls.eventsLoadMoreButton}>
        Показать еще
      </Button>
    </section>
  );
}
