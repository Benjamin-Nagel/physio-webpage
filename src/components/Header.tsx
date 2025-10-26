"use client";

import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { webpageData } from "@/data/general-page-data";
import { navigation } from "@/data/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // height animation (unchanged)
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (openDropdown) {
      el.style.display = "block";
      const h = el.scrollHeight;
      el.style.height = "0px";
      el.style.transition = "height 280ms ease, opacity 200ms ease";
      el.style.height = `${h}px`;
      el.style.opacity = "1";
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName === "height") {
          el.style.height = "auto";
          el.removeEventListener("transitionend", onEnd);
        }
      };
      el.addEventListener("transitionend", onEnd);
    } else {
      if (getComputedStyle(el).display === "none") return;
      const currentH = el.scrollHeight;
      el.style.height = `${currentH}px`;
      el.style.transition = "height 280ms ease, opacity 200ms ease";
      el.style.height = "0px";
      el.style.opacity = "0";
      const onClose = (e: TransitionEvent) => {
        if (e.propertyName === "height") {
          el.style.display = "none";
          el.removeEventListener("transitionend", onClose);
        }
      };
      el.addEventListener("transitionend", onClose);
    }
  }, [openDropdown]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenDropdown(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // viewport width tracking
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // split navigation logically
  let visibleItems = navigation;
  let condensedItems: typeof navigation = [];

  if (viewportWidth >= 768 && viewportWidth < 1024) {
    const sliceIndex = 5;
    visibleItems = navigation.slice(0, sliceIndex); // show first few
    condensedItems = navigation.slice(sliceIndex); // rest under "Mehr"
  }

  const activeItem =
    navigation.find((i) => i.name === openDropdown) ||
    condensedItems.find((i) => i.name === openDropdown);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          className="flex items-center gap-2 font-semibold text-lg"
          href="/"
        >
          <Image
            alt={`${webpageData.name} Logo`}
            className="h-8 w-auto"
            height={32}
            src="/logo.jpg"
            width={70}
          />
        </Link>

        {/* Mobile toggle */}
        <button
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMobileOpen((s) => !s)}
          type="button"
        >
          <span className="sr-only">Menü öffnen</span>
          {mobileOpen ? (
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          )}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex md:items-center md:gap-8">
          {visibleItems.map((item) => (
            <li className="relative" key={item.name}>
              {item.children ? (
                <button
                  aria-controls="inline-dropdown"
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() =>
                    setOpenDropdown((cur) =>
                      cur === item.name ? null : item.name
                    )
                  }
                  type="button"
                >
                  <span>{item.name}</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  className="rounded-md px-2 py-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  href={item.href ?? "#"}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}

          {/* "Mehr" Dropdown nur zwischen md und lg */}
          {condensedItems.length > 0 && (
            <li className="relative">
              <button
                aria-controls="inline-dropdown"
                aria-expanded={openDropdown === "Mehr"}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() =>
                  setOpenDropdown((cur) => (cur === "Mehr" ? null : "Mehr"))
                }
                type="button"
              >
                <span>Mehr</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${
                    openDropdown === "Mehr" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* Inline fade-dropdown */}
      {openDropdown && (
        <div
          aria-label={`${openDropdown} Untermenü`}
          className="overflow-hidden border-b border-gray-200 bg-white z-40"
          id="inline-dropdown"
          ref={panelRef}
          role="region"
          style={{ display: "none", height: 0, opacity: 0 }}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {openDropdown === "Mehr"
              ? condensedItems.map((item) => (
                  <div className="space-y-3" key={item.name}>
                    {/* Haupteintrag */}
                    <Link
                      className="block font-semibold text-gray-900 hover:text-indigo-600"
                      href={item.href ?? "#"}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>

                    {/* Untereinträge */}
                    {item.children && (
                      <ul className="space-y-1">
                        {item.children
                          .sort((e1, e2) => (e1.name > e2.name ? 1 : -1))
                          .map((sub) => (
                            <li key={sub.name}>
                              <Link
                                className="flex items-center gap-2 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {sub.icon && (
                                  <span className="shrink-0">
                                    {React.cloneElement(sub.icon, {
                                      height: 24,
                                      width: 24,
                                    })}
                                  </span>
                                )}
                                <span>{sub.name}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))
              : activeItem && (
                  <>
                    <Link
                      className="flex col-span-full font-bold items-center gap-2 rounded px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      href={activeItem.href ?? "#"}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {activeItem.name}
                    </Link>
                    {activeItem.children
                      ?.sort((e1, e2) => (e1.name > e2.name ? 1 : -1))
                      .map((sub) => (
                        <Link
                          className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          href={sub.href}
                          key={sub.name}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {sub.icon && (
                            <span className="shrink-0">
                              {React.cloneElement(sub.icon, {
                                height: 24,
                                width: 24,
                              })}
                            </span>
                          )}
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                  </>
                )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          aria-label="Mobiles Menü"
          className="
    md:hidden
    border-t border-gray-200
    bg-white
    z-40
    max-h-[calc(100vh-4rem)] 
    overflow-y-auto           
    fixed left-0 right-0 top-16"
          id="mobile-menu"
          role="menu"
        >
          <ul className="px-4 py-3 space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  className="block px-2 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  href={item.href ?? "#"}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-3">
                    {item.children
                      .sort((e1, e2) => (e1.name > e2.name ? 1 : -1))
                      .map((sub) => (
                        <li key={sub.name}>
                          <Link
                            className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 hover:text-indigo-600"
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.icon && (
                              <span className="shrink-0">
                                {React.cloneElement(sub.icon, {
                                  height: 24,
                                  width: 24,
                                })}
                              </span>
                            )}
                            <span className="truncate">{sub.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
