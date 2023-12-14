import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { volumes } from "../../lib/data";
import styled from "styled-components";
import { GlobalStyle } from "@/styles";

export default function VolumeDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const volumeIndex = volumes.findIndex((volume) => volume.slug === slug);

  const volume = volumes[volumeIndex];
  const previousVolume = volumes[volumeIndex - 1];
  const nextVolume = volumes[volumeIndex + 1];

  if (!volume) {
    return null;
  }

  const { title, description, cover, books } = volume;

  const Header = styled.h1`
    font-family: var(--font-headline-1);
    color: var(--color-smoke);
    text-align: center;
    margin: 40px 0 20px 0;
  `;

  const Description = styled.p`
    font-family: var(--font-caption);
    color: var(--color-smoke);
    margin: 20px 0;
    line-height: 1.5;
  `;

  const BooksList = styled.ul`
    list-style-type: none;
    margin: 30px 0 0;
    padding: 0;

    li {
      font-family: var(--font-body);
      font-size: 16px;
      margin: 10px 0;
    }
  `;

  const CoverImage = styled("img")`
    width: 140px;
    height: 230px;
    border-radius: 50%;
    box-shadow: var(--box-shadow-book);
    margin-bottom: 30px;
  `;

  const PreviousNextLink = styled(Link)`
    color: var(--color-earth);
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid var(--color-earth);
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-clouds);
    }
  `;

  return (
    <>
      <Link href="/volumes">← All Volumes</Link>
      <Header>{title}</Header>
      <Description>{description}</Description>
      <BooksList>
        {books.map(({ ordinal, title }) => (
          <li key={title}>
            {ordinal}: <strong>{title}</strong>
          </li>
        ))}
      </BooksList>
      <Image
        src={cover}
        alt={`Cover image of ${title}`}
        width={140}
        height={230}
      />
      {previousVolume ? (
        <div>
          <PreviousNextLink href={`/volumes/${previousVolume.slug}`}>
            ← Previous Volume: {previousVolume.title}
          </PreviousNextLink>
        </div>
      ) : null}
      {nextVolume ? (
        <div>
          <PreviousNextLink href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title} →
          </PreviousNextLink>
        </div>
      ) : null}
      <CoverImage src={cover} alt={`Cover image of ${title}`} />
    </>
  );
}
