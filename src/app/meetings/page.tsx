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
import { getUser, getUserIsAdmin } from "@/core/store/slices/userAuthSlice";

export default function MeetingsPage() {
  const { error, isLoading, roleFilters, datesFilters, limit, hasMore } = useSelector(getAllEvents);
  const { storedCities } = useSelector(getUser);
  const isAdmin = useSelector(getUserIsAdmin);
  const { eventsBySpeakerId, eventsByVisitorId } = useSelector(getEventByVisitor);
  const filteredEvents = useSelector(getEvents.selectAll);
  const tabs = [{ title: "Все мероприятия" }, { title: "Участвую" }, { title: "Провожу" }];
  const tabsAdmin = [{ title: "Заявки" }, { title: "Активные" }, { title: "Все мероприятия" }];
  const [ordersLength, setIsOrdersLength] = useState();
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [selectedTabAdmin, setSelectedTabAdmin] = useState(tabsAdmin[0].title);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [passedEvents, setPassedEvents] = useState([]);
  const dispatch = useAppDispatch();
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    dispatch(fetchEventsByVisitorId());
    dispatch(fetchEventsBySpeakerId());
  }, [dispatch]);

  const clickHandleTab = useCallback((title: string) => {
    setSelectedTab(title);
  }, []);

  const clickHandleTabAdmin = useCallback((title: string) => {
    setSelectedTabAdmin(title);
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
    if (isAdmin) {
      dispatch(fetchEvents({ actualType: "all", offset, approved: false }));
    } else {
      dispatch(fetchEvents({ offset, approved: true }));
    }
  }, [dispatch, isAdmin, offset]);

  function timeToMinutes(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  const showedEvents = () => {
    if (selectedTab === tabs[0].title && filteredEvents) {
      return filteredEvents.map((event) => (
        <SmallCard event={event} key={event.id} isAdmin={isAdmin} />
      ));
    } else if (selectedTab === tabs[1].title && eventsByVisitorId) {
      return eventsByVisitorId.map((event) => (
        <SmallCard event={event} key={event.id} isAdmin={isAdmin} />
      ));
    } else if (selectedTab === tabs[2].title && eventsBySpeakerId) {
      return eventsBySpeakerId.map((event) => (
        <SmallCard event={event} key={event.id} isAdmin={isAdmin} />
      ));
    }
  };

  const showedEventsAdmin = () => {
    if (selectedTabAdmin === tabsAdmin[0].title) {
      return filteredEvents
        .filter((event) => {
          const eventTime = event.time_start;
          const eventTotalMinutes = timeToMinutes(eventTime);
          return event.approved === false && currentTotalMinutes <= eventTotalMinutes;
        })
        .map((event) => <SmallCard event={event} key={event.id} isAdmin={isAdmin} />);
    } else if (selectedTabAdmin === tabsAdmin[1].title) {
      return filteredEvents
        .filter((event) => {
          const eventTime = event.time_start;
          const eventTotalMinutes = timeToMinutes(eventTime);
          return event.approved === true && currentTotalMinutes <= eventTotalMinutes;
        })
        .map((event) => <SmallCard event={event} key={event.id} isAdmin={isAdmin} />);
    } else if (selectedTabAdmin === tabsAdmin[2].title) {
      return filteredEvents.map((event) => (
        <SmallCard event={event} key={event.id} isAdmin={isAdmin} />
      ));
    }
  };

  if (isAdmin) {
    return (
      <section>
        <FiltersEventsWrapper isOpen={isOpenFilter} onClose={onCloseFilters}></FiltersEventsWrapper>
        <div className={cls.filtersWrapper}>
          <div className={cls.buttonWrapper}>
            <Tabs
              tabs={tabsAdmin}
              selected={selectedTabAdmin}
              onTabClick={clickHandleTabAdmin}
              numberSelected={[
                filteredEvents.filter((event) => {
                  const eventTime = event.time_start;
                  const eventTotalMinutes = timeToMinutes(eventTime);
                  return event.approved === false && currentTotalMinutes <= eventTotalMinutes;
                }).length,
                filteredEvents.filter((event) => {
                  const eventTime = event.time_start;
                  const eventTotalMinutes = timeToMinutes(eventTime);
                  return event.approved === true && currentTotalMinutes <= eventTotalMinutes;
                }).length,
                filteredEvents.length,
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
          {showedEventsAdmin()}
        </div>
        {hasMore &&
          !roleFilters.length &&
          !datesFilters.length &&
          (selectedTabAdmin === tabs[0].title || selectedTabAdmin === tabs[1].title) && (
            <Button onClick={onLoadMore} variant="loadMore" className={cls.eventsLoadMoreButton}>
              Показать еще
            </Button>
          )}
      </section>
    );
  } else {
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
                filteredEvents.length,
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
        {hasMore &&
          !roleFilters.length &&
          !datesFilters.length &&
          selectedTab === tabs[0].title && (
            <Button onClick={onLoadMore} variant="loadMore" className={cls.eventsLoadMoreButton}>
              Показать еще
            </Button>
          )}
      </section>
    );
  }
}
