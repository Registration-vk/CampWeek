"use client";

import { SmallCard } from "@/components/ui/SmallCard/SmallCard";
import cls from "./styles.module.scss";
import OnlineIcon from "@/assets/icons/icons/online.svg";
import PenIcon from "@/assets/icons/icons/pen.svg";
import FiltersIcon from "@/assets/icons/icons/filters.svg";
import CityIcon from "@/assets/icons/icons/city.svg";
import { Button } from "@/components/ui";
import PlaceFilter from "@/components/ui/PlaceFilter/ui/PlaceFilter";
import { Tab, Tabs } from "@/components/ui/Tabs/Tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { FiltersEventsWrapper } from "@/components/ui/FiltersEventsWrapper/FiltersEventsWrapper";
import { useSelector } from "react-redux";
import { getAllEvents } from "@/core/store/slices/eventsSlice";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchEvents } from "@/core/store/services/fetchEvents";
import { Icon } from "@/components/ui/Icon/Icon";
import { regionsId } from "@/feature/MeetingForm/static";
import { NotifyPopup } from "@/components/ui/Notification/NotifyPopup";

export default function MeetingsPage() {
  const { filteredEvents, error, isLoading, roleFilters, storedCities } = useSelector(getAllEvents);
  const tabs = useMemo<Tab[]>(
    () => [{ title: "Все мероприятия" }, { title: "Участвую" }, { title: "Провожу" }],
    [],
  );
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [tabsCounter, setTabsCounter] = useState(0);
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

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <section>
      <FiltersEventsWrapper isOpen={isOpenFilter} onClose={onCloseFilters}></FiltersEventsWrapper>
      <div className={cls.filtersWrapper}>
        <div className={cls.buttonWrapper}>
          <Tabs
            tabs={tabs}
            selected={selectedTab}
            onTabClick={clickHandleTab}
            numberSelected={filteredEvents.length}
          />
          <button onClick={onOpenFilters} className={cls.counterWrapper}>
            <Icon Svg={FiltersIcon} />
            <div className={cls.counterText}>Настройка фильтров</div>
            <div className={cls.counter}>{roleFilters.length}</div>
          </button>
        </div>
        <div className={cls.filtersCitiesWrapper}>
          <NotifyPopup
            className={cls.citiesWrapper}
            text="Для изменения списка отслеживаемых конференций перейдите в профиль"
          >
            {storedCities &&
              storedCities.map((city) => (
                <PlaceFilter
                  text={city}
                  key={city}
                  disabled
                  Svg={city === "Онлайн" ? OnlineIcon : CityIcon}
                />
              ))}
          </NotifyPopup>
          {roleFilters &&
            roleFilters.map((role) => (
              <PlaceFilter text={role} key={`${role} - filtersRole`} editable />
            ))}
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
