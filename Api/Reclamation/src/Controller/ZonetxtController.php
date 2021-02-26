<?php

namespace App\Controller;

use App\Entity\Zonetxt;
use App\Form\ZonetxtType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

#[Route('/zonetxt')]
class ZonetxtController extends AbstractController
{
    #[Route('/', name: 'zonetxt_index', methods: ['GET'])]
    public function index(): Response
    {
        $zonetxts = $this->getDoctrine()
            ->getRepository(Zonetxt::class)
            ->findAll();

        return $this->render('zonetxt/index.html.twig', [
            'zonetxts' => $zonetxts,
        ]);
    }

    #[Route('/new', name: 'zonetxt_new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    {
        $zonetxt = new Zonetxt();
        $form = $this->createForm(ZonetxtType::class, $zonetxt);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($zonetxt);
            $entityManager->flush();

            return $this->redirectToRoute('zonetxt_index');
        }

        return $this->render('zonetxt/new.html.twig', [
            'zonetxt' => $zonetxt,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'zonetxt_show', methods: ['GET'])]
    public function show(Zonetxt $zonetxt): Response
    {
        return $this->render('zonetxt/show.html.twig', [
            'zonetxt' => $zonetxt,
        ]);
    }

    #[Route('/{id}/edit', name: 'zonetxt_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Zonetxt $zonetxt): Response
    {
        $form = $this->createForm(ZonetxtType::class, $zonetxt);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('zonetxt_index');
        }

        return $this->render('zonetxt/edit.html.twig', [
            'zonetxt' => $zonetxt,
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'zonetxt_delete', methods: ['DELETE'])]
    public function delete(Request $request, Zonetxt $zonetxt): Response
    {
        if ($this->isCsrfTokenValid('delete'.$zonetxt->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($zonetxt);
            $entityManager->flush();
        }

        return $this->redirectToRoute('zonetxt_index');
    }
	
	#[Route('/GetZone/all', name: 'getAllZone')]
    public function getAllZone(): Response
    {
      		 

		$encoders = [new XmlEncoder(), new JsonEncoder()];
		$normalizers = [new ObjectNormalizer()];
		$serializer = new Serializer($normalizers, $encoders);
	
	  
		
		$Zones = $this->getDoctrine()
            ->getRepository(Zonetxt::class)
            ->findAll();	
 
			
			
			
		$ZonesAlls = $serializer->serialize($Zones, 'json');
 
		
		
		$response = new Response();
		
		$response->setContent($ZonesAlls);
		$response->headers->set('Content-Type', 'application/json');	
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->send();
		 
        return new Response();
    }
	
	
}
