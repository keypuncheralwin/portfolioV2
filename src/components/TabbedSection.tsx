"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface TabbedSectionProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderContent: (activeTab: string) => ReactNode;
  className?: string;
  tabClassName?: string;
  highlightClassName?: string;
  id?: string;
}

export default function TabbedSection({
  tabs,
  activeTab,
  setActiveTab,
  renderContent,
  className = "",
  tabClassName = "",
  highlightClassName = "tabHighlight",
  id
}: TabbedSectionProps) {
  // Refs for the sliding highlight animation
  const tabsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const highlightRef = useRef<HTMLDivElement | null>(null);

  // Update the highlight position when the active tab changes
  useEffect(() => {
    const activeTabEl = tabsRef.current[activeTab];
    const highlight = highlightRef.current;
    if (activeTabEl && highlight) {
      if (window.innerWidth > 768) {
        highlight.style.transform = `translateY(${activeTabEl.offsetTop}px)`;
        highlight.style.height = `${activeTabEl.offsetHeight}px`;
        highlight.style.width = "2px";
        highlight.style.right = "0";
        highlight.style.left = "auto";
        highlight.style.top = "0";
      } else {
        highlight.style.transform = `translateX(${activeTabEl.offsetLeft}px)`;
        highlight.style.width = `${activeTabEl.offsetWidth}px`;
        highlight.style.height = "2px";
        highlight.style.left = "0";
        highlight.style.top = "auto";
        highlight.style.bottom = "0px";
      }
    }
  }, [activeTab]);

  // Update highlight position on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeTabEl = tabsRef.current[activeTab];
      const highlight = highlightRef.current;
      if (activeTabEl && highlight) {
        if (window.innerWidth > 768) {
          highlight.style.transform = `translateY(${activeTabEl.offsetTop}px)`;
          highlight.style.height = `${activeTabEl.offsetHeight}px`;
          highlight.style.width = "2px";
          highlight.style.right = "0";
          highlight.style.left = "auto";
          highlight.style.top = "0";
        } else {
          highlight.style.transform = `translateX(${activeTabEl.offsetLeft}px)`;
          highlight.style.width = `${activeTabEl.offsetWidth}px`;
          highlight.style.height = "2px";
          highlight.style.left = "0";
          highlight.style.top = "auto";
          highlight.style.bottom = "0px";
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  // Create a ref to track content heights
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [displayedTab, setDisplayedTab] = useState(activeTab);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Check all tabs on initial load to find the tallest one
  useEffect(() => {
    // Initialize by measuring all tabs to find the tallest
    const initializeTabs = () => {
      // Measure the initial tab immediately
      if (contentRef.current && !initialLoadComplete) {
        // Set initial height to current tab
        const initialHeight = contentRef.current.scrollHeight;
        setContentHeight(initialHeight);
        
        // Now systematically measure each tab by temporarily switching to it
        // We'll save the current tab so we can restore it
        const currentTab = activeTab;
        let maxHeight = initialHeight;
        
        // Create a single measurement sequence - switching tabs temporarily
        // and measuring them one by one without visible UI changes
        const measureNextTab = (index = 0) => {
          // If we've measured all tabs, finalize
          if (index >= tabs.length) {
            // Restore original tab and update height
            setDisplayedTab(currentTab);
            setContentHeight(maxHeight);
            setInitialLoadComplete(true);
            setIsVisible(true);
            return;
          }
          
          const tabToMeasure = tabs[index];
          // Skip current tab, already measured
          if (tabToMeasure === currentTab) {
            measureNextTab(index + 1);
            return;
          }
          
          // Temporarily switch to this tab (invisibly)
          setIsVisible(false);
          setDisplayedTab(tabToMeasure);
          
          // Measure after render
          setTimeout(() => {
            if (contentRef.current) {
              const height = contentRef.current.scrollHeight;
              maxHeight = Math.max(maxHeight, height);
            }
            // Move to next tab
            measureNextTab(index + 1);
          }, 0);
        };
        
        // Start the measurement sequence if we have more than one tab
        if (tabs.length > 1) {
          setIsVisible(false); // Hide during measurements
          measureNextTab();
        } else {
          // If only one tab, we're already done
          setInitialLoadComplete(true);
        }
      }
    };
    
    // Run after a brief delay to ensure component is fully rendered
    const timer = setTimeout(initializeTabs, 100);
    return () => clearTimeout(timer);
  }, [tabs, activeTab, renderContent, initialLoadComplete, displayedTab]);

  // Update content height when tab changes or content updates
  useEffect(() => {
    if (activeTab !== displayedTab && initialLoadComplete) {
      // First fade out
      setIsVisible(false);
      
      // After the fade-out, update the displayed content
      const contentSwitchTimer = setTimeout(() => {
        setDisplayedTab(activeTab);
        
        // Measure the height after content has rendered
        const measureTimer = setTimeout(() => {
          if (contentRef.current) {
            // Get the current content height
            const height = contentRef.current.scrollHeight;
            // Update state if it's larger than our currently tracked height
            setContentHeight(prev => Math.max(height, prev || 0));
            
            // Then fade back in
            setIsVisible(true);
          }
        }, 50);
        
        return () => clearTimeout(measureTimer);
      }, 250); // Wait for fade-out to complete
      
      return () => clearTimeout(contentSwitchTimer);
    }
  }, [activeTab, displayedTab, initialLoadComplete]);

  return (
    <section className={className} id={id}>
      <div className="tabbedContainer">
        <div className="tabsScrollContainer">
          <div className="tabsList">
            <div ref={highlightRef} className={highlightClassName} />
            {tabs.map((tab) => (
              <div
                key={tab}
                ref={(el) => {
                  tabsRef.current[tab] = el;
                }}
                className={`tabItem${activeTab === tab ? " active" : ""} ${tabClassName}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div 
          className="tabContent" 
          ref={contentRef}
          style={{
            ...(contentHeight ? { minHeight: `${contentHeight}px` } : {}),
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {renderContent(displayedTab)}
        </div>
      </div>
    </section>
  );
}
