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
import { getAllEvents, getEvents } from "@/core/store/slices/eventsSlice";
import { useAppDispatch } from "@/core/store/hooks/typingHooks";
import { fetchEvents } from "@/core/store/services/fetchEvents";
import { Icon } from "@/components/ui/Icon/Icon";
import { regionsId } from "@/feature/MeetingForm/static";
import { NotifyPopup } from "@/components/ui/Notification/NotifyPopup";
import {
  fetchEventsByVisitorId,
  fetchEventsBySpeakerId,
} from "@/core/store/services/fetchEventsByVisitorId";
import { getEventByVisitor } from "@/core/store/slices/eventByVisitorIdSlice";
import { getUser, getUserId, getUserIsAdmin } from "@/core/store/slices/userAuthSlice";
import { fetchAdminRole } from "@/core/store/services/fetchAdminRole";

export default function MeetingsPage() {
  const { error, isLoading, roleFilters, datesFilters, limit, hasMore } = useSelector(getAllEvents);
  const { storedCities } = useSelector(getUser);
  const userId = useSelector(getUserId);
  const { eventsBySpeakerId, eventsByVisitorId } = useSelector(getEventByVisitor);
  const filteredEvents = useSelector(getEvents.selectAll);
  const tabs = useMemo<Tab[]>(
    () => [{ title: "Заявки" }, { title: "Активные" }, { title: "Архив" }],
    [],
  );
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [approvedEvents, setApprovedEvents] = useState(
    filteredEvents.filter((event) => {
      return event.approved === true;
    }),
  );
  const [noApprovedEvents, setNoApprovedEvents] = useState(
    filteredEvents.filter((event) => {
      return event.approved === false;
    }),
  );
  const dispatch = useAppDispatch();
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    dispatch(fetchEventsByVisitorId());
    dispatch(fetchEventsBySpeakerId());
    if (userId) {
      dispatch(fetchAdminRole(userId));
    }
  }, [dispatch, userId]);

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
    dispatch(fetchEvents({ offset }));
  }, [dispatch, offset]);

  const showedEvents = () => {
    if (selectedTab === tabs[0].title && filteredEvents) {
      return filteredEvents.map((event) => <SmallCard event={event} key={event.id} />);
    } else if (selectedTab === tabs[1].title && eventsByVisitorId) {
      return eventsByVisitorId.map((event) => <SmallCard event={event} key={event.id} />);
    } else if (selectedTab === tabs[2].title && eventsBySpeakerId) {
      return eventsBySpeakerId.map((event) => <SmallCard event={event} key={event.id} />);
    }
  };

  const getApprovedEvents = (approve: boolean) => {
    return filteredEvents.filter((event) => {
      event.approved === approve;
    });
  };

  return (
    <section>
      <FiltersEventsWrapper isOpen={isOpenFilter} onClose={onCloseFilters}></FiltersEventsWrapper>
      <div className={cls.filtersWrapper}>
        <div className={cls.buttonWrapper}>
          <Tabs
            tabs={tabs}
            selected={selectedTab}
            onTabClick={clickHandleTab}
            numberSelected={[
              noApprovedEvents.length,
              eventsByVisitorId.length,
              eventsBySpeakerId.length,
            ]}
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
        {showedEvents()}
      </div>
      {hasMore && !roleFilters.length && !datesFilters.length && selectedTab === tabs[0].title && (
        <Button onClick={onLoadMore} variant="loadMore" className={cls.eventsLoadMoreButton}>
          Показать еще
        </Button>
      )}
    </section>
  );
}
