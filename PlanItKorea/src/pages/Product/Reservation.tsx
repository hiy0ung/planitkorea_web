import React, {
  useEffect,
  useState,
} from "react";
import { ProductDetail, SubProduct } from "../../types/type";
import {
  PersonDiv,
  PersonInput,
  PriceBar,
  ReservationBar,
  ReservationBarDiv,
  SelectInfo,
} from "./DetailSt";
import { ProductName } from "./AllProductSt";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faWonSign } from "@fortawesome/free-solid-svg-icons";
import { GroupLine } from "../CustomerService/customerSt";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface ReservationProps {
  product: ProductDetail;
  selectSubProduct?: SubProduct;
  startDateProp?: Date;
  endDateProp?: Date;
  personProp?: number;
  handlePersonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Reservation({
  product,
  selectSubProduct,
  startDateProp,
  endDateProp,
  personProp,
  handlePersonChange,
}: ReservationProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(startDateProp);
  const [endDate, setEndDate] = useState<Date | undefined>(endDateProp);
  const [person, setPerson] = useState<number>(personProp || 1);
  const [availableSubProducts, setAvailableSubProducts] = useState<
    SubProduct[]
  >([]);

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();

  const today = new Date();

  const calculateDays = () => {
    if (!startDate || !endDate) return { nights: 0, days: 0 };
    const totalDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    const nights = totalDays - 1;
    return { nights, days: totalDays };
  };

  const { nights, days } = calculateDays();

  function strToNum(str: string): number {
    return parseInt(str.replace(/[^0-9]/g, ""), 10);
  }

  function numPriceToStr(num: number): string {
    return num.toLocaleString("ko-KR");
  }
  const totalPrice = strToNum(product.productPrice) * days;

  const reservationSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      alert("로그인 후 예약이 가능합니다.");
      return;
    }

    const reservationInfo = {
      productId: product.productId,
      productName: product.productName,
      img: Array.isArray(product.productImages)
        ? product.productImages
        : [product.productImages || ""],
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
      person,
      price: totalPrice,
    };
    navigate("/paymentPage", { state: { reservationInfo } });
  };

  useEffect(() => {
    if (product.subProducts) {
      setAvailableSubProducts(
        product.subProducts.filter((sub) => sub.subPerson >= person)
      );
    }
  }, [person, product.subProducts]);

  return (
    <ReservationBarDiv>
      <ReservationBar>
        <ProductName>{product.productName}</ProductName>
        <div
          style={{
            zIndex: 10,
            width: "100%",
          }}
        >
          <div
            className="box-border p-4 border border-cyan-200 rounded-lg flex items-center space-x-2"
            style={{ border: "none" }}
          >
            <div className="relative flex-1">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) =>
                  setStartDate(date || undefined)
                }
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-full p-2 border border-cyan-400 rounded-l-lg"
                placeholderText="Start Date"
                isClearable={false}
                minDate={today}
              />
            </div>
            <div className="relative flex-1">
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date || undefined)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || today}
                className="w-full p-2 border border-cyan-400 rounded-r-lg"
                placeholderText="End Date"
              />
            </div>
          </div>
        </div>
        {/* 인원 수 */}
        <PersonDiv>
          <PersonInput
            type="number"
            value={person}
            placeholder="인원 수"
            onChange={(e) => {
              const newPerson = Number(e.target.value) || 1;
              setPerson(newPerson);
              handlePersonChange(e);
            }}
            min={1}
          ></PersonInput>
        </PersonDiv>
        <SelectInfo>
          <FontAwesomeIcon
            icon={faCalendar}
            style={{ margin: "0 7px 0 6px" }}
          />
          {nights} 박 {days} 일
        </SelectInfo>
        <SelectInfo>
          <span>객실</span> {selectSubProduct?.subName}
        </SelectInfo>
        <GroupLine style={{ marginBottom: "5px" }} />
        <PriceBar>
          <div>총 합계</div>
          <div>
            <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faWonSign} />
            {selectSubProduct?.subPrice}
          </div>
        </PriceBar>
        <Button style={{ width: "90%" }} onClick={reservationSubmit}>
          예약 하기
        </Button>
      </ReservationBar>
    </ReservationBarDiv>
  );
}
